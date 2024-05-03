import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import videoFill from '@iconify/icons-eva/video-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Avatar,
  Typography,
  AvatarGroup,
  Stack,
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
//
import { MIconButton } from '../@material-extend';
import BadgeStatus from '../BadgeStatus';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexShrink: 0,
  minHeight: 92,
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  zIndex: 1,
}));

// ----------------------------------------------------------------------

OneAvatar.propTypes = {
  participants: PropTypes.array,
};

function OneAvatar({ participants }) {
  const participant = [...participants][0];

  if (participant === undefined) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar src={participant?.image?.url} alt={participant?.name} />
      </Box>
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{participant?.name}</Typography>
        {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {participant.status !== 'offline'
            ? capitalCase(participant.status)
            : fToNow(participant.lastActivity)}
        </Typography> */}
      </Box>
    </Box>
  );
}

GroupAvatar.propTypes = {
  participants: PropTypes.array,
  title: PropTypes.string,
};

function GroupAvatar({ participants, title }) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', gap: 1 }}>
      <AvatarGroup
        max={3}
        sx={{
          mb: 0.5,
          '& .MuiAvatar-root': { width: 32, height: 32 },
        }}
      >
        {participants.map((participant) => (
          <Avatar
            key={participant._id}
            alt={participant.name}
            src={participant.avatar}
          />
        ))}
      </AvatarGroup>
      <Link
        variant="body2"
        underline="none"
        component="button"
        color="text.secondary"
        onClick={() => {}}
      >
        <Typography variant="subtitle2">{title}</Typography>
      </Link>
    </Stack>
  );
}

ChatHeaderDetail.propTypes = {
  participants: PropTypes.array,
  groupTitle: PropTypes.string,
};

export default function ChatHeaderDetail({
  participants,
  groupTitle,
  ...other
}) {
  const { user } = useSelector(({ user }) => user);
  const withoutMe = participants?.filter((v) => user?._id !== v._id);
  const isGroup = withoutMe.length > 1;

  return (
    <RootStyle {...other}>
      {isGroup ? (
        <GroupAvatar participants={withoutMe} title={groupTitle} />
      ) : (
        <OneAvatar participants={withoutMe} />
      )}
    </RootStyle>
  );
}
