/** @format */

import { Button, FormControl, IconButton, TextField } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserForm } from '@/types/frontend';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/system';
import { GAP } from '@/constants';
import { Add } from '@mui/icons-material';

const schema = z.object({
  email: z.string().email(),
});

type UserFormProps = {
  handleSubmit: (data: CreateUserForm) => void;
};

const UserForm: React.FC<UserFormProps> = ({ handleSubmit }) => {
  const { register, handleSubmit: onSubmit } = useForm<CreateUserForm>({
    resolver: zodResolver(schema as any),
  });

  return (
    <Box
      id="create-user-form"
      display="flex"
      alignItems="center"
      gap={GAP}
      component="form"
      onSubmit={onSubmit(handleSubmit)}
    >
      <TextField
        type="email"
        size="small"
        required
        fullWidth
        label="Email"
        {...register('email')}
      />
      <IconButton type="submit">
        <Add />
      </IconButton>
    </Box>
  );
};

export default UserForm;
