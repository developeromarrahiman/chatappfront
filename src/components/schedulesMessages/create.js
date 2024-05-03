import * as React from 'react';
import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
} from '@mui/material';
import { ChatHeaderCompose } from '../chat';
import { useSelector } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import { useMutation } from 'react-query';
// api
import * as api from '../../services';
// notification
import toast from 'react-hot-toast';

export default function CreatescheduleMessage({
  handleCloseDialog,
  handleClickOpenDialog,
  openDialog,
  id,
  currentData,
}) {
  const [formData, setFormData] = React.useState({
    date: '',
    body: '',
    user: '',
  });
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (currentData) {
      setFormData({
        date: currentData?.date || '',
        body: currentData?.body || '',
        user: currentData?.user || '',
      });
    }
  }, [currentData]);

  const { mutate } = useMutation(
    id ? api.updateScheduleMessage : api.createScheduleMessage,
    {
      onSuccess: async (res) => {
        toast.success('Created Alert Message');
        setLoading(false);
      },
      onError: (err) => {
        const message = JSON.stringify(err.response.data.message);
        toast.error(message ? JSON.parse(message) : 'Something went wrong!');
        setLoading(false);
      },
    }
  );

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
      ...(id && {
        id: id,
      }),
    });
    handleCloseDialog();
  };
  const { contacts, recipients } = useSelector((state) => state.chat);
  const handleAddRecipients = (recipients, e) => {
    console.log(recipients, 'recipients');

    setFormData((prevState) => ({
      ...prevState,
      user: recipients._id,
    }));
  };
  return (
    <>
      <Button
        onClick={handleClickOpenDialog}
        variant='text'
        size='small'
        sx={{ textTransform: 'capitalize' }}
        color='inherit'>
        Create Schedule
      </Button>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='xs'
        fullWidth
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {id ? 'Update' : 'Create'} Schedule Message
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            {!id && (
              <ChatHeaderCompose
                recipients={recipients}
                contacts={Object.values(contacts.byId)}
                onAddRecipients={handleAddRecipients}
                isSingleRecipient
              />
            )}
            <Stack
              spacing={2}
              px={3}>
              <TextField
                name='date'
                size='small'
                fullWidth
                type='date'
                variant='outlined'
                placeholder='Date'
                value={formData.date}
                onChange={handleChange}
              />
              {!id && (
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
              )}
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
