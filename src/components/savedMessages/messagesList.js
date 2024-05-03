import * as React from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
// notification
import toast from 'react-hot-toast';

export default function SavedMessageList() {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const { data } = useQuery(['get-alert'], () => api.getAlert());

  const { mutate } = useMutation(api.deleteAlertMessage, {
    onSuccess: async (res) => {
      toast.success('Alert Message Deleted!');
      handleCloseDialog();
    },
    onError: (err) => {
      toast.error('Something went wrong');
    },
  });
  return (
    <>
      <Button
        onClick={handleClickOpenDialog}
        variant='text'
        size='small'
        sx={{ textTransform: 'capitalize' }}
        color='inherit'>
        Saved Messages
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='xs'
        fullWidth
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Saved Messages</DialogTitle>
        <DialogContent>
          {data?.data.length < 1 ? (
            <Typography
              variant='h6'
              textAlign='center'>
              Data not found
            </Typography>
          ) : (
            <List>
              {data?.data.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Stack
                        spacing={1}
                        justifyContent='space-between'
                        alignItems='end'>
                        <Typography
                          variant='body2'
                          fontSize={12}
                          color='text.secondary'>
                          {formatDistanceToNowStrict(
                            item?.createdAt
                              ? new Date(item?.createdAt)
                              : new Date(),
                            {
                              addSuffix: true,
                            }
                          )}
                        </Typography>
                        <div>
                          <IconButton
                            onClick={() => mutate(item?._id)}
                            autoFocus
                            size='small'
                            edge='end'>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </Stack>
                    }>
                    <Stack spacing={1}>
                      <Typography
                        variant='subtitle1'
                        fontWeight={600}
                        color='text.primary'>
                        {item?.user.name}
                      </Typography>
                      <Typography
                        variant='body2'
                        color='text.secondary'>
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
