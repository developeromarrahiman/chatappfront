import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
// material
import { Box, Collapse, Divider, Stack, IconButton } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import {
  addRecipients,
  onSendMessage,
  onCreateMessage,
  getConversation,
  getParticipants,
  markConversationAsRead,
  resetActiveConversation,
  addGroupTitle,
} from 'src/redux/slices/chat';
// routes
// import { PATH_DASHBOARD } from '../../../routes/paths';
//
import ChatRoom from './ChatRoom';
import ChatMessageList from './ChatMessageList';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
import ChatHeaderCompose from './ChatHeaderCompose';
import RefresChat from './RefresChat';
import ChatMessageDeleteDialog from './ChatMessageDeleteDialog';
import { LuReply } from 'react-icons/lu';
import { MdOutlineCancel } from 'react-icons/md';

// ----------------------------------------------------------------------

const conversationSelector = (state, chatId) => {
  const { conversations } = state.chat;
  const conversation = chatId ? conversations.byId[chatId] : null;
  if (chatId) {
    return conversation;
  }
  const initState = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: '',
  };
  return initState;
};

export default function ChatWindow() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const [activeId, setActiveId] = useState(null);
  const [isDelete, setDelete] = useState(false);
  const [isReply, setReply] = useState(false);
  const [count, setCount] = useState(0);
  const [sendCount, setSendCount] = useState(0);
  const conversationKey = searchParams.get('uid');
  const {
    contacts,
    recipients,
    participants,
    activeConversationId,
    chatId: createChatId,
    groupTitle,
  } = useSelector((state) => state.chat);
  const conversation = useSelector((state) =>
    conversationSelector(state, conversationKey)
  );
  const { user } = useSelector(({ user }) => user);

  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';
  const displayParticipants = participants?.filter(
    (item) => item.id !== user?._id
  );
  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(conversationKey));
      try {
        await dispatch(getConversation(conversationKey));
        setSendCount((prev) => prev + 1);
      } catch (error) {
        console.error(error);
        navigate('/chat/new');
      }
    };
    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (recipients) => {
    dispatch(addRecipients(recipients));
  };

  const handleSendMessage = async (value) => {
    try {
      // alert('asd');
      if (!Boolean(conversationKey)) {
        await dispatch(onCreateMessage(value));
        setSendCount((prev) => prev + 1);
      } else {
        const { participants, ...others } = value;
        await dispatch(
          onSendMessage({
            ...others,
            chatId: conversationKey,
            replyTo: isReply._id,
          })
        );
        setReply(false);
        setSendCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangeTitle = (e) => {
    dispatch(addGroupTitle(e.target.value));
  };
  useEffect(() => {
    if (createChatId && !Boolean(conversationKey)) {
      navigate('/?uid=' + createChatId);
    }
  }, [createChatId]);

  return (
    <Stack sx={{ flexGrow: 1, minWidth: '1px' }}>
      {mode === 'DETAIL' ? (
        <ChatHeaderDetail
          participants={displayParticipants}
          groupTitle={conversation?.title}
        />
      ) : (
        <ChatHeaderCompose
          groupTitle={groupTitle}
          recipients={recipients}
          contacts={Object.values(contacts.byId)}
          onAddRecipients={handleAddRecipients}
          onChangeTitle={handleChangeTitle}
        />
      )}

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Stack sx={{ flexGrow: 1 }}>
          <ChatMessageList
            myId={user?._id || ''}
            conversation={conversation}
            setActiveId={setActiveId}
            activeId={activeId}
            setDelete={setDelete}
            setReply={setReply}
            sendCount={sendCount}
            conversationKey={conversationKey}
          />

          <Divider />
          <Collapse in={Boolean(isReply)}>
            <>
              <Stack
                sx={{
                  p: 1,
                  bgcolor: 'background.default',
                }}
                direction="row"
                gap={1}
                alignItems="center"
                justifyContent={'end'}
              >
                <LuReply /> <span>{isReply?.body}</span>
                <IconButton
                  size="small"
                  aria-label="remove"
                  onClick={() => setReply(false)}
                >
                  <MdOutlineCancel />
                </IconButton>
              </Stack>
              <Divider />
            </>
          </Collapse>

          <ChatMessageInput
            conversationId={activeConversationId}
            onSend={handleSendMessage}
            groupTitle={groupTitle}
            disabled={pathname === '/chat/new'}
          />
        </Stack>

        {mode === 'DETAIL' && (
          <ChatRoom
            conversation={conversation}
            participants={displayParticipants}
          />
        )}
      </Box>
      {conversationKey && <RefresChat chatId={conversationKey} count={count} />}
      <ChatMessageDeleteDialog
        open={isDelete}
        handleClose={() => setDelete(false)}
        setCount={setCount}
        mid={isDelete}
      />
    </Stack>
  );
}
