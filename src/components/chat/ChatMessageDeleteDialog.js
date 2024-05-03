import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as api from 'src/services';

// notification
import toast from 'react-hot-toast';
// react query
import { useMutation } from 'react-query';
export default function AlertDialog({ open, handleClose, setCount, mid }) {
  // mutate
  const { mutate, isLoading } = useMutation(api.deleteMessage, {
    onSuccess: async (res) => {
      setCount((prev) => prev + 1);
      toast.success('Message Deleted!');
      handleClose();
    },
    onError: (err) => {
      toast.error('Something went wrong');
    },
  });
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to delete this message?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button disabled={isLoading} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={isLoading} onClick={() => mutate(mid)} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
