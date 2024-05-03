import { useEffect } from 'react';
// material
import { Card, Container } from '@mui/material';
// redux
import { useDispatch } from 'src/redux/store';
import { getConversations, getContacts } from 'src/redux/slices/chat';
// routes

// components
import Page from 'src/components/Page';
import { ChatSidebar, ChatWindow } from 'src/components/chat';

// ----------------------------------------------------------------------

export default function Chat() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversations());

    dispatch(getContacts());
  }, [dispatch]);

  return (
    <Page title='Chat | Minimal-UI'>
      <Card
        elevation={0}
        sx={{ height: 'calc(100vh - 64px)', display: 'flex' }}>
        <ChatSidebar />
        <ChatWindow />
      </Card>
    </Page>
  );
}
