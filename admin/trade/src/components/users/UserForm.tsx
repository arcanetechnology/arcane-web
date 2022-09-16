/** @format */

import { Box, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { UserForm as UserFormType } from '@/types/frontend';

const UserForm: React.FC = () => {
  const { register, handleSubmit } = useForm<UserFormType>();

  const onSubmit = (data: UserFormType) => console.log(data);

  return (
    <Box marginTop={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          size="medium"
          fullWidth
          label="Email"
          {...register('email')}
        />
      </form>
    </Box>
  );
};

export default UserForm;
