/** @format */

import { UserForm } from '@/components';
import { GAP } from '@/constants';
import { CreateUserForm } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';

const CreateUser: React.FC = () => {
  const handleSubmit = (data: CreateUserForm) => {
    console.log(data);
  };
  return (
    <Stack gap={GAP}>
      <UserForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreateUser;
