import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { Button, Stack, Divider } from '@mui/material';
import SidebarDrawer from '../../components/home/SidebarDrawar';
import { useDispatch, useSelector } from 'react-redux';
import { LuLogOut } from 'react-icons/lu';
import { setLogout } from '../../redux/slices/user';
import { useNavigate, useLocation } from 'react-router-dom';
import SavedMessageList from 'src/components/savedMessages/messagesList';
import CreateAlertMessage from 'src/components/savedMessages/createAlert';
import ScheduleMessagesList from 'src/components/schedulesMessages/list';
import CreatescheduleMessage from 'src/components/schedulesMessages/create';
import { useQuery } from 'react-query';
import * as api from 'src/services';

function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [id, setId] = React.useState('');
  const { data } = useQuery(['get-single-schedule'], () =>
    api.getSingleScheduleMessage(id)
  );
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleUpdateId = (newValue) => {
    setId(newValue);
    setOpenDialog(true);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // logout
  const toggleLogout = () => {
    navigate('/auth/login');
  };
  console.log(data?.data, 'Single Data');
  return (
    <Box
      position="static"
      sx={{
        bgcolor: '#28AADC ',
        boxShadow: 'none',
        color: '#fff',
      }}
    >
      {/* <Container
        maxWidth='xl'
        sx={{ px: { md: 'auto', xs: '8px !important' } }}> */}
      <Toolbar
        // disableGutters
        sx={{ justifyContent: 'space-between' }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <SidebarDrawer />
          {/* <Typography
              variant='h3'
              noWrap
              component="a"
              href="/"
              sx={{
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: { md: 32, xs: 24 },
              }}
            >
              LOGO
            </Typography> */}
          <img
            src="/images/logo-white.png"
            alt="logo"
            width="100%"
            height={80}
          />
        </Stack>
        <Box sx={{ display: 'flex', flexGrow: 0, gap: 2 }}>
          <Stack
            sx={{
              display: { xs: 'none', md: 'flex' },
            }}
            direction="row"
            alignItems="center"
            spacing={2}
          >
            {user?.role === 'admin' && <CreateAlertMessage />}
            <SavedMessageList />
            <CreatescheduleMessage
              openDialog={openDialog}
              handleClickOpenDialog={handleClickOpenDialog}
              handleCloseDialog={handleCloseDialog}
              id={id}
              currentData={data?.data}
            />
            <ScheduleMessagesList handleUpdateId={handleUpdateId} />
          </Stack>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user?.image ? (
                <Avatar src={user?.image?.url} alt="avatar" />
              ) : (
                <Avatar>{user?.name?.slice(0, 1)}</Avatar>
              )}
            </IconButton>
          </Tooltip>
          {/* profile manu  */}
          <Menu
            sx={{ mt: '45px', px: 2 }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <Stack spacing={1}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ px: 2, py: 1 }}
              >
                {user?.image ? (
                  <Avatar src={user?.image?.url} alt="avatar" />
                ) : (
                  <Avatar>{user?.name?.slice(0, 1)}</Avatar>
                )}
                <Stack>
                  <Typography variant="subtitle2">{user?.name}</Typography>
                  <Typography variant="body2">{user?.email}</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Box px={2}>
                <Button
                  onClick={() => {
                    dispatch(setLogout());
                    toggleLogout();
                  }}
                  variant="text"
                  color="inherit"
                  startIcon={<LuLogOut />}
                  fullWidth
                  sx={{ textTransform: 'capitalize' }}
                >
                  Sign Out
                </Button>
              </Box>
            </Stack>
          </Menu>
        </Box>
      </Toolbar>
      {/* </Container> */}
    </Box>
  );
}
export default Navbar;
