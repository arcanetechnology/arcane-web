/** @format */

import { useAddUserMutation } from '@/services';
import { UserForm as UserFormType } from '@/types/frontend';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material';
import * as React from 'react';
import { toast } from 'react-toastify';
import UserForm from './UserForm';

const CreateUser: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const submitRef = React.useRef<HTMLButtonElement>(null);

  const handleAddUser = async (user: UserFormType) => {
    try {
      await addUser(user).unwrap();
      handleClose();
    } catch {
      toast('An error occured', { type: 'error' });
    }
  };

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
        <Divider />
        <DialogContent id="create-user-form">
          <UserForm submitRef={submitRef} userSubmit={handleAddUser} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              submitRef.current?.click();
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreateUser;