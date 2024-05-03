import * as React from 'react';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from '@mui/material';
// notification
import toast from 'react-hot-toast';
import { ChatHeaderCompose } from '../chat';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
// api
import * as api from '../../services';

export default function CreateAlertMessage() {
  const [formData, setFormData] = React.useState({
    body: '',
    user: '',
  });
  const [loading, setLoading] = React.useState(false);

  const { mutate } = useMutation(api.createAlert, {
    onSuccess: async (res) => {
      toast.success('Created Alert Message');
      setLoading(false);
    },
    onError: (err) => {
      const message = JSON.stringify(err.response.data.message);
      toast.error(message ? JSON.parse(message) : 'Something went wrong!');
      setLoading(false);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      ...formData,
    });
    handleCloseDialog();
  };
  const { contacts, recipients } = useSelector((state) => state.chat);
  const handleAddRecipients = (recipients, e) => {
    setFormData((prevState) => ({
      ...prevState,
      user: recipients._id,
    }));
  };

  // dialog
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <>
      <Button
        onClick={handleClickOpenDialog}
        variant='text'
        size='small'
        sx={{ textTransform: 'capitalize' }}
        color='inherit'>
        Create Alert
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='xs'
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>Create Alert Messages</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
              isSingleRecipient
            />
            <Stack
              spacing={2}
              px={3}>
              <TextField
                name='body'
                size='small'
                multiline
                rows={5}
                fullWidth
                type='text'
                variant='outlined'
                placeholder='Message'
                value={formData.body}
                onChange={handleChange}
              />
              <Stack
                direction='row'
                alignItems='center'
                spacing={2}>
                <Button
                  fullWidth
                  size='small'
                  variant='outlined'
                  sx={{ textTransform: 'capitalize' }}
                  color='primary'
                  onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <LoadingButton
                  loading={loading}
                  type='submit'
                  fullWidth
                  size='small'
                  variant='contained'
                  sx={{ textTransform: 'capitalize' }}
                  color='primary'>
                  Save
                </LoadingButton>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
