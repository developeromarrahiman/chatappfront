import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from 'axios';
import {
  getChatList,
  getMessagesByChatId,
  searchUser,
  createChat,
  addMessage,
} from 'src/services';

// ----------------------------------------------------------------------

function objFromArray(array, key = '_id') {
  return array.reduce((accumulator, current) => {
    accumulator[current[key]] = current;
    return accumulator;
  }, {});
}

const initialState = {
  isLoading: false,
  error: false,
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activechatId: null,
  participants: [],
  recipients: [],
  chatId: null,
  groupTitle: null,
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET CONTACT SSUCCESS
    getContactsSuccess(state, action) {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversations.byId = objFromArray(conversations);
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload.data;

      const key = action.payload.conversationKey;
      if (conversation) {
        state.conversations.byId[key] = conversation;
        state.participants = conversation.participants;
        state.activechatId = key;
        if (!state.conversations.allIds.includes(key)) {
          state.conversations.allIds.push(key);
        }
      } else {
        state.activechatId = null;
      }
    },

    // ON SEND MESSAGE
    onSendMessage(state, action) {
      const conversation = action.payload;
      const { chatId, _id, body, createdAt, senderId } = conversation;

      const newMessage = {
        _id,
        body,
        createdAt,
        senderId,
      };
      state.groupTitle = null;
      state.conversations.byId[chatId].messages.push(newMessage);
    },
    onCreateMessage(state, action) {
      const conversation = action.payload;
      const { chatId, _id, body, createdAt, senderId } = conversation;

      const newMessage = {
        _id,
        body,
        createdAt,
        senderId,
      };
      state.groupTitle = null;
      state.chatId = chatId;
      state.conversations.byId = {
        ...state.conversations.byId,
        [chatId]: {
          messages: [{ ...newMessage }],
        },
      };
    },
    markConversationAsReadSuccess(state, action) {
      const { chatId } = action.payload;
      const conversation = state.conversations.byId[chatId];
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },

    // GET PARTICIPANTS
    getParticipantsSuccess(state, action) {
      const participants = action.payload;
      state.participants = participants;
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.activechatId = null;
      state.groupTitle = null;
    },

    addRecipients(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    },
    onAddChatId(state, action) {
      const chatId = action.payload;
      state.chatId = chatId;
    },
    addGroupTitle(state, action) {
      state.groupTitle = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addRecipients,
  resetActiveConversation,
  getConversationSuccess,
  addGroupTitle,
} = slice.actions;

// ----------------------------------------------------------------------
export function onCreateMessage(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await createChat(data);
      dispatch(slice.actions.onCreateMessage(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function onSendMessage(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await addMessage(data);
      dispatch(slice.actions.onSendMessage(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getContacts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await searchUser();
      dispatch(slice.actions.getContactsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversations() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getChatList();
      dispatch(slice.actions.getConversationsSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await getMessagesByChatId(conversationKey);
      dispatch(
        slice.actions.getConversationSuccess({
          data: { ...response.chat, messages: response.data },
          conversationKey,
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(chatId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.get('/api/chat/conversation/mark-as-seen', {
        params: { chatId },
      });
      dispatch(slice.actions.markConversationAsReadSuccess({ chatId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function refreshChat(chatId) {
  return async (dispatch) => {
    try {
      try {
        const response = await getMessagesByChatId(chatId);
        dispatch(
          slice.actions.getConversationSuccess({
            data: { ...response.chat, messages: response.data },
            chatId,
          })
        );
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getParticipants(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/participants', {
      //   params: { conversationKey },
      // });
      // dispatch(
      //   slice.actions.getParticipantsSuccess(response.data.participants)
      // );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
