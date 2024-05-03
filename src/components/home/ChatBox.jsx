import React, { useState, useEffect, useRef } from 'react';
import {
  TextField,
  Box,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Zoom,
} from '@mui/material';
// api
import * as api from '../../services';
// react query
import { useMutation } from 'react-query';
// notification
import toast from 'react-hot-toast';
// icons
import { VscSend } from 'react-icons/vsc';
import { MdFormatColorText } from 'react-icons/md';
import LinkIcon from '../../assets/Link-Icon';
import { BsEmojiWink } from 'react-icons/bs';
import { HiOutlineGif } from 'react-icons/hi2';
import { useSelector } from 'react-redux';
import { fToNow } from '../../utils/formatTime';
import { FaCheck } from 'react-icons/fa6';
import { IoMdEye } from 'react-icons/io';

const ChatBox = ({
  showIcon,
  selectedValue,
  conversationData,
  chatId,
  setCount,
}) => {
  const [inputValue, setInputValue] = useState('');
  const { user } = useSelector(({ user }) => user);
  const messageContainerRef = useRef(null); // Ref for message container

  const { mutate } = useMutation(
    conversationData?.length ? api.addMessage : api.createChat,
    {
      ...(conversationData?.length && {
        enabled: Boolean(chatId),
      }),
      retry: false,
      onSuccess: (data) => {
        messageContainerRef.current.scrollTo({
          top: messageContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
        // console.log(data);
        // toast.success('Message Sent!');
      },
      onError: (err) => {
        setloading(false);
        toast.error('Something went wrong!');
      },
    }
  );
  const handleSendMessage = () => {
    if (inputValue) {
      mutate({
        message: { text: inputValue },
        isGroup: false,
        participants: [user._id, chatId],
        ...(conversationData?.length && {
          chatId: chatId,
          userId: user._id,
        }),
      });
      setInputValue('');
    }
  };

  useEffect(() => {
    // Scroll to bottom on initial render or after new messages are added
    setTimeout(() => {
      messageContainerRef?.current?.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 2000);
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputValue) {
        mutate({
          message: { text: inputValue },
          isGroup: false,
          participants: [user._id, chatId],
          ...(conversationData?.length && {
            chatId: chatId,
            userId: user._id,
          }),
        });
        setInputValue('');
      }
    }
  };
  const lastIndex = (conversationData ? conversationData : [])?.findLastIndex(
    (item) => item.userId._id === user._id
  );

  return (
    <Box
      sx={{
        paddingX: { md: 10, xs: 1 },
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{ height: 'calc(100vh - 214px)', overflow: 'scroll', pb: 2 }}
        ref={messageContainerRef}
        className="noscroll"
      >
        {!showIcon && (
          <>
            {conversationData?.map((item, index) => (
              <Box
                sx={{
                  width: '100%',
                }}
              >
                <Stack
                  direction="row"
                  spacing={item.userId._id === user._id ? 1 : 2}
                  alignItems={lastIndex === index ? 'end' : 'start'}
                  justifyContent={
                    item.userId._id === user._id ? 'end' : 'start'
                  }
                  mt={1}
                  sx={{
                    width: 350,
                    ml: item.userId._id === user._id ? 'auto' : 0,
                  }}
                >
                  {item.userId._id !== user._id && (
                    <Avatar
                      src={item?.userId?.image?.url}
                      alt="avatar"
                      sx={{ width: 32, height: 32 }}
                    />
                  )}
                  <Stack
                    spacing={1}
                    mb={1}
                    className="chat_main"
                    sx={{
                      bgcolor:
                        item.userId._id !== user._id ? '#fff' : '#E8EBFA',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      mr: 2,
                      position: 'relative',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent:
                          item.userId._id === user._id
                            ? 'end'
                            : 'space-between',
                      }}
                    >
                      {item.userId._id !== user._id && (
                        <Typography
                          variant="h6"
                          fontSize={14}
                          fontWeight={400}
                          sx={{ color: '#000000' }}
                          noWrap
                          width={120}
                        >
                          {item?.userId?.name}
                        </Typography>
                      )}
                      {Boolean(lastIndex === index) && (
                        <Typography
                          variant="body1"
                          fontSize={12}
                          sx={{ color: '#757575' }}
                          fontWeight={300}
                          noWrap
                        >
                          {fToNow(item.createdAt)}
                        </Typography>
                      )}
                    </Box>

                    <Typography
                      variant="body2"
                      fontSize={12}
                      color="text.primary"
                    >
                      {item.text}
                    </Typography>
                  </Stack>

                  <Box
                    sx={{
                      width: 14,
                    }}
                  >
                    {Boolean(lastIndex === index) &&
                      (item.seen ? (
                        <IoMdEye fontSize={14} />
                      ) : (
                        <FaCheck fontSize={14} />
                      ))}
                  </Box>
                </Stack>
              </Box>
            ))}
          </>
        )}
      </Box>
      {/* action  */}
      <Box>
        <Stack>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message"
            sx={{
              bgcolor: '#fff',
              mb: 'auto',
              input: {
                paddingY: { md: 1.5, xs: 1 },
              },
            }}
            value={inputValue} // Set the current input value
            onChange={(event) => setInputValue(event.target.value)}
            onKeyDown={onKeyDown}
          />
          <Stack
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            mt={0.5}
          >
            <Stack flexDirection="row" alignItems="center" gap={0.5}>
              <IconButton>
                <MdFormatColorText fontSize={18} />
              </IconButton>
              <IconButton>
                <LinkIcon />
              </IconButton>
              <IconButton>
                <BsEmojiWink fontSize={18} />
              </IconButton>
              <IconButton>
                <HiOutlineGif fontSize={18} />
              </IconButton>
            </Stack>
            <IconButton
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              sx={{ color: '#757575' }}
            >
              <VscSend fontSize={20} />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChatBox;
