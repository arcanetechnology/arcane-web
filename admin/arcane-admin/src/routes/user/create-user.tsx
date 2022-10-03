/** @format */

import { UserForm } from '@/components';
import { GAP } from '@/constants';
import { useAddUserMutation } from '@/services';
import { CreateUserForm } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';
import { toast } from 'react-toastify';

const CreateUser: React.FC = () => {
  const [addUser] = useAddUserMutation();
  const handleSubmit = async (user: CreateUserForm) => {
    try {
      await addUser(user).unwrap();
    } catch (err) {
      toast('unable to create user', { type: 'error' });
    }
  };
  return (
    <Stack gap={GAP}>
      <UserForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreateUser;
