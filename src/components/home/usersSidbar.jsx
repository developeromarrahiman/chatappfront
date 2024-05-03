import {
  Box,
  Typography,
  Fab,
  Stack,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Link,
} from '@mui/material';
import React from 'react';
import Fade from '@mui/material/Fade';
import { useSelector } from 'react-redux';
// icons
import { BiSolidEdit } from 'react-icons/bi';
import { FaCaretDown } from 'react-icons/fa';
import { fToNow } from '../../utils/formatTime';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function UserSidebar({ handleChangeshow, listData, chatId }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { user } = useSelector(({ user }) => user);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: { md: 320, xs: 280 },
        borderRight: { md: '1px solid #D9D7D7', xs: 'none' },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        px={2}
        py={1.5}
        borderBottom={'1px solid #D9D7D7'}
      >
        <Typography
          variant="h4"
          color="text.primarry"
          fontWeight={700}
          fontSize={{ md: 20, xs: 16 }}
        >
          Chat
        </Typography>
        <Fab
          aria-label=""
          onClick={handleChangeshow}
          sx={{
            bgcolor: '#5B5FC7 !important',
            color: '#fff',
            width: 36,
            height: 32,
          }}
        >
          <BiSolidEdit fontSize={14} />
        </Fab>
      </Stack>
      <Stack direction="row" px={2} py={1.5}>
        <Button
          startIcon={<FaCaretDown />}
          sx={{ color: '#000' }}
          id="fade-button"
          aria-controls={open ? 'fade-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Recent
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Stack>
      {/* chat  */}

      <Box
        sx={{
          overflow: 'scroll',
          height: 'calc(100vh - 124)',
          position: 'relative',
        }}
        className="noscroll"
      >
        {listData?.map((item, index) => {
          const particepent =
            item.participants &&
            item.participants.find((v) => v.email !== user.email);
          console.log(item, user, 'asds');
          return (
            <Box
              key={Math.random()}
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                navigate('?uid=' + item._id);
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                px={2}
                py={1.5}
                mx={0.5}
                sx={{
                  bgcolor: chatId === item._id ? '#e8e7ea' : '#fff',
                  borderRadius: 1,
                }}
                mb={0.5}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <Avatar
                    src={
                      item.participants
                        ? particepent?.image?.url
                        : item?.image?.url
                    }
                    alt="avatar"
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box>
                    <Typography
                      variant="h6"
                      color="text.primary"
                      fontSize={14}
                      fontWeight={400}
                    >
                      {item.participants ? particepent?.name : item?.name}
                    </Typography>
                    {item.conversations && (
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontSize={10}
                      >
                        {item?.conversations[0]?.text}
                      </Typography>
                    )}
                  </Box>
                </Stack>
                <Typography variant="body1" color="text.primary" fontSize={12}>
                  {item.participants && fToNow(particepent.createdAt)}
                </Typography>
              </Stack>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
