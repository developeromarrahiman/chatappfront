import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import { MdDelete } from 'react-icons/md';

import {
  Divider,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
} from '@mui/material';
import { useQuery } from 'react-query';
import * as api from 'src/services';
import { useMutation } from 'react-query';
import { fDateShort } from 'src/utils/formatTime';
// notification
import toast from 'react-hot-toast';
import { MdEdit } from 'react-icons/md';

export default function ScheduleMessagesList({ handleUpdateId }) {
  // dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { data } = useQuery(['get-schedule'], () => api.getScheduleMessages());

  // const { mutate } = useMutation(api.deleteScheduleMessage, {
  //   onSuccess: async (res) => {
  //     toast.success('Alert Message Deleted!');
  //     handleCloseDialog();
  //   },
  //   onError: (err) => {
  //     toast.error('Something went wrong');
  //   },
  // });
  return (
    <>
      <Button
        onClick={handleClickOpenDialog}
        variant="text"
        size="small"
        sx={{ textTransform: 'capitalize' }}
        color="inherit"
      >
        schedule Messages
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Schedule Messages</DialogTitle>
        <DialogContent>
          {data?.data.length < 1 ? (
            <Typography variant="h6" textAlign="center">
              Data not found
            </Typography>
          ) : (
            <List
              sx={{
                width: '100%',
                maxWidth: 460,
                bgcolor: 'background.paper',
              }}
            >
              {data?.data.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Stack
                        spacing={1}
                        justifyContent="space-between"
                        alignItems="end"
                      >
                        <Typography
                          variant="body2"
                          fontSize={12}
                          color="text.secondary"
                        >
                          {fDateShort(item?.createdAt)}
                        </Typography>
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          justifyContent="end"
                        >
                          <IconButton
                            onClick={() => {
                              handleUpdateId(item?._id);
                              handleCloseDialog();
                            }}
                            size="small"
                            edge="end"
                          >
                            <MdEdit size={24} />
                          </IconButton>
                          <IconButton
                            // onClick={() => mutate(item?._id)}
                            size="small"
                            edge="end"
                          >
                            <MdDelete size={24} />
                          </IconButton>
                        </Stack>
                      </Stack>
                    }
                  >
                    <Stack spacing={1}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {item?.chatId?.participants[1]?.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item?.body}
                      </Typography>
                    </Stack>
                  </ListItem>
                  {index !== data?.data.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
