import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material';

export default function AlertMessagePopup({
  open,
  data,
  onConfirm,
  handleClose,
}) {
  console.log(data, 'login Data');
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {data?.user.name}
          {/* <Typography
            variant='subtitle2'
            color='primary'
            component='span'
            sx={{
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
              p: 1,
            }}>
            Admin
          </Typography> */}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data?.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            px: 2,
            pb: 2,
            button: {
              textTransform: 'capitalize',
              borderRadius: 2,
            },
          }}
        >
          <Button onClick={handleClose} variant="outlined">
            Reject
          </Button>
          <Button variant="contained" onClick={onConfirm} autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
