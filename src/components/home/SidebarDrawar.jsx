import * as React from 'react';
import { Box, Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import SavedMessageList from 'src/components/savedMessages/messagesList';
import CreateAlertMessage from 'src/components/savedMessages/createAlert';
import ScheduleMessagesList from 'src/components/schedulesMessages/list';
import CreatescheduleMessage from 'src/components/schedulesMessages/create';
import { useSelector } from 'react-redux';
// icons
import { FaBars } from 'react-icons/fa6';
import { IconButton } from '@mui/material';

export default function SidebarDrawer() {
  const [open, setOpen] = React.useState(false);
  const { user } = useSelector(({ user }) => user);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ px: 1, py: 2 }}
      role='presentation'>
      <Stack spacing={2}>
        {user?.role === 'admin' && <CreateAlertMessage />}
        <SavedMessageList />
        <CreatescheduleMessage />
        <ScheduleMessagesList />
      </Stack>
    </Box>
  );

  return (
    <>
      <IconButton
        onClick={toggleDrawer(true)}
        sx={{ display: { md: 'none ', xs: 'block' } }}>
        <FaBars
          fontSize={20}
          color='#fff'
        />
      </IconButton>
      <Drawer
        open={open}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 200 },
        }}
        onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
}
