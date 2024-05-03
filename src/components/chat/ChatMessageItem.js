import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// material
import { alpha, styled } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Stack,
  Collapse,
} from '@mui/material';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { GoReply } from 'react-icons/go';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),

  backgroundColor: theme.palette.background.neutral,
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary,
}));

const MessageImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  cursor: 'pointer',
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up('md')]: {
    height: 200,
    minWidth: 296,
  },
}));

// ----------------------------------------------------------------------

ChatMessageItem.propTypes = {
  message: PropTypes.object.isRequired,
  conversation: PropTypes.object.isRequired,
};

export default function ChatMessageItem({
  message,
  conversation,
  isMe,
  setActiveId,
  activeId,
  setDelete,
  setReply,
}) {
  const sender = conversation?.messages?.find(
    (participant) => participant?._id === message?.senderId
  );

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto',
          }),
        }}
        onMouseEnter={() => setActiveId(message._id)}
        onMouseLeave={() => setActiveId(null)}
      >
        {!isMe && (
          <Avatar
            alt={message?.senderId?.name}
            src={message?.senderId?.image?.url}
            sx={{ width: 32, height: 32, mr: 2 }}
          />
        )}

        <div>
          <InfoStyle
            variant="caption"
            sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}
          >
            {!isMe && `${message?.senderId?.name},`}&nbsp;
            {formatDistanceToNowStrict(
              message?.createdAt ? new Date(message?.createdAt) : new Date(),
              {
                addSuffix: true,
              }
            )}
          </InfoStyle>
          {message?.replyTo && (
            <Box
              sx={{
                maxWidth: 320,
                padding: (theme) => theme.spacing(0.8),
                marginTop: (theme) => theme.spacing(0.5),
                borderRadius: '4px 4px 0 0',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                borderBottom: '1px solid ' + '#eee',
                ...(isMe && {
                  color: 'grey.800',
                  bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
                }),
              }}
            >
              <Typography variant="body2" fontSize={11}>
                {' '}
                <GoReply /> {message.replyTo.body}
              </Typography>
            </Box>
          )}

          <ContentStyle
            sx={{
              mt: message?.replyTo ? 0 : 0.5,
              borderRadius: message?.replyTo ? '0 0 4px 4px' : '4px',
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.2),
              ...(isMe && {
                color: 'grey.800',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
              }),
            }}
          >
            <Typography variant="body2">{message.body}</Typography>
          </ContentStyle>

          <Stack height={24}>
            <Collapse in={activeId === message._id}>
              <Stack direction="row">
                <IconButton
                  onClick={() => setReply(message)}
                  size="small"
                  aria-label="reply"
                >
                  <GoReply />
                </IconButton>
                {isMe && (
                  <IconButton
                    onClick={() => setDelete(message?._id)}
                    size="small"
                    aria-label="delete"
                  >
                    <MdOutlineDeleteForever />
                  </IconButton>
                )}
              </Stack>
            </Collapse>
          </Stack>
        </div>
      </Box>
    </RootStyle>
  );
}
