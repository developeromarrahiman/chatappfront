import React from 'react';
import { useQuery } from 'react-query';
import * as api from '../../services';
import { useDispatch } from 'react-redux';
import { getConversationSuccess } from 'src/redux/slices/chat';

export default function RefresChat({ chatId, count }) {
  const dispatch = useDispatch();
  const data = useQuery(
    ['get-chat-by-id', chatId, count],
    () => api.getMessagesByChatId(chatId),
    {
      refetchInterval: 3000,
      onSuccess: (res) => {
        dispatch(
          getConversationSuccess({
            data: { ...res.chat, messages: res.data },
            conversationKey: chatId,
          })
        );
      },
    }
  );

  return null;
}
