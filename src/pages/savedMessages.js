import { Container, Typography } from '@mui/material';
import React from 'react';
import MessageList from 'src/components/savedMessages/messagesList';

export default function SavedMessages() {
  return (
    <Container>
      <Typography
        variant='h5'
        mb={2}>
        Saved Messages
      </Typography>
      <MessageList />
    </Container>
  );
}
