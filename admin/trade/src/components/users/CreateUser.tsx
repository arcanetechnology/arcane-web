/** @format */

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import * as React from 'react';
import UserForm from './UserForm';

const CreateUser: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <React.Fragment>
      <Button
        sx={{ zIndex: 1 }}
        onClick={handleOpen}
        size="large"
        variant="contained"
      >
        Create User
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="create-user-title"
        aria-describedby="create-user-form"
      >
        <DialogTitle id="create-user-title">Create User</DialogTitle>
        <DialogContent id="create-user-form">
          <UserForm />
        </DialogContent>
        <DialogActions>
          <Button>Cancel</Button>
          <Button variant="contained">Confirm</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateUser;
