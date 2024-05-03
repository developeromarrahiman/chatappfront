import {
  Avatar,
  Box,
  Stack,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import React, { useState } from 'react';
// import SearchIcon from '@mui/icons-material/Search';
import ChatBox from './ChatBox';
import ChatSearch from './chatSearch';
import { useQuery } from 'react-query';
import * as api from '../../services';

export default function Home({
  showIcon,
  handleChangeSearchVal,
  selectedValue,
}) {
  const [count, setCount] = useState(0);

  const { data } = !Boolean(selectedValue)
    ? { data: [] }
    : useQuery(
        ['get-chat-by-id', selectedValue, count],
        () => api.getMessagesByChatId(selectedValue._id),
        {
          refetchInterval: 1000,
        }
      );

  return (
    <Box sx={{ width: '100%' }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        px={{ md: showIcon ? 0 : 4, xs: showIcon ? 0 : 2 }}
        py={showIcon ? 0 : '14px'}
        borderBottom={'1px solid #D9D7D7'}
      >
        {showIcon ? (
          <ChatSearch handleChangeSearchVal={handleChangeSearchVal} />
        ) : (
          <>
            <Avatar
              src="/images/chat-avatar.png"
              alt="avatar"
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <Typography
                variant="h6"
                color="text.primary"
                fontSize={16}
                fontWeight={700}
              >
                Kamran Haider
              </Typography>
            </Box>
          </>
        )}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <ChatBox
          showIcon={showIcon}
          conversationData={data?.conversation}
          selectedValue={selectedValue}
          chatId={selectedValue?._id}
          setCount={() => setCount((prev) => prev + 1)}
        />
      </Stack>
    </Box>
  );
}
