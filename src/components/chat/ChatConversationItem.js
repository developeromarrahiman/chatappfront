import { last } from 'lodash';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Avatar,
  ListItemText,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
//
import BadgeStatus from '../BadgeStatus';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const AVATAR_SIZE_GROUP = 32;

const RootStyle = styled(ListItemButton)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  transition: theme.transitions.create('all'),
}));

const AvatarWrapperStyle = styled('div')({
  position: 'relative',
  width: AVATAR_SIZE,
  height: AVATAR_SIZE,
  '& .MuiAvatar-img': { borderRadius: '50%' },
  '& .MuiAvatar-root': { width: '100%', height: '100%' },
});

// ----------------------------------------------------------------------

// const getDetails = (conversation, currentUserId) => {
//   console.
//   const otherParticipants = particepents?.filter(
//     (participant) => participant.id !== currentUserId
//   );
//   const displayNames = otherParticipants
//     ?.reduce((names, participant) => [...names, participant.name], [])
//     .join(', ');
//   let displayText = '';

//   return { otherParticipants, displayNames, displayText };
// };

ChatConversationItem.propTypes = {
  isSelected: PropTypes.bool,
  conversation: PropTypes.object.isRequired,
  isOpenSidebar: PropTypes.bool,
  onSelectConversation: PropTypes.func,
};

export default function ChatConversationItem({
  isSelected,
  conversation,
  isOpenSidebar,
  user,
  onSelectConversation,
}) {
  // const details = getDetails(conversation, user?._id);

  const displayLastActivity = last(conversation.messages);
  const isGroup = conversation.isGroup;
  const isLast = last(conversation.messages?.filter((v) => v._id !== user._id));

  const particepents = conversation?.participants?.filter(
    (v) => v._id !== user?._id
  );
  return (
    <RootStyle
      onClick={onSelectConversation}
      sx={{
        ...(isSelected && { bgcolor: 'action.selected' }),
      }}
    >
      <ListItemAvatar>
        <Box
          sx={{
            ...(isGroup && {
              position: 'relative',
              width: AVATAR_SIZE,
              height: AVATAR_SIZE,
              '& .avatarWrapper': {
                position: 'absolute',
                width: AVATAR_SIZE_GROUP,
                height: AVATAR_SIZE_GROUP,
                '&:nth-of-type(1)': {
                  left: 0,
                  zIndex: 9,
                  bottom: 2,
                  '& .MuiAvatar-root': {
                    border: (theme) =>
                      `solid 2px ${theme.palette.background.paper}`,
                  },
                },
                '&:nth-of-type(2)': { top: 2, right: 0 },
              },
            }),
          }}
        >
          {particepents.map((participant) => (
            <AvatarWrapperStyle className="avatarWrapper" key={participant.id}>
              <Avatar alt={participant.name} src={participant?.image?.url} />
            </AvatarWrapperStyle>
          ))}
          {/* 
          {isOnlineGroup && (
            <BadgeStatus
              status="online"
              sx={{ right: 2, bottom: 2, position: 'absolute' }}
            />
          )} */}
        </Box>
      </ListItemAvatar>

      {isOpenSidebar && (
        <>
          <ListItemText
            primary={
              conversation?.isGroup
                ? conversation?.title
                : particepents
                    ?.reduce(
                      (names, participant) => [...names, participant.name],
                      []
                    )
                    .join(', ')
            }
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            secondary={displayLastActivity?.body}
            secondaryTypographyProps={{
              noWrap: true,
              // variant: isLast && !isLast?.seen ? 'subtitle2' : 'body2',
              // color: isLast && !isLast?.seen ? 'textPrimary' : 'textSecondary',
              variant: 'body2',
              color: 'textSecondary',
            }}
          />

          <Box
            sx={{
              ml: 2,
              height: 44,
              display: 'flex',
              alignItems: 'flex-end',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                mb: 1.25,
                fontSize: 12,
                lineHeight: '22px',
                whiteSpace: 'nowrap',
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(
                displayLastActivity?.createdAt
                  ? new Date(displayLastActivity?.createdAt)
                  : new Date(),
                {
                  addSuffix: false,
                }
              )}
            </Box>
            {/* {isLast && !isLast?.seen && (
              <BadgeStatus status="unread" size="small" />
            )} */}
          </Box>
        </>
      )}
    </RootStyle>
  );
}
