/** @format */

import { Button, FormControl, TextField } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserForm } from '@/types/frontend';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Box } from '@mui/system';
import { GAP } from '@/constants';

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
      flexDirection="column"
      gap={GAP}
      component="form"
      onSubmit={onSubmit(handleSubmit)}
    >
      <TextField
        type="email"
        size="medium"
        fullWidth
        label="Email"
        {...register('email')}
      />
      <Box width="100%" display="flex" flexDirection="row" gap={GAP}>
        <Button variant="contained" type="submit" id="create-user-submit">
          Submit
        </Button>
        <Button type="reset" id="create-user-reset">
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default UserForm;
