/** @format */

import { TextField } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { UserForm as UserFormType } from '@/types/frontend';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email(),
});

type UserFormProps = {
  submitRef: React.LegacyRef<HTMLButtonElement>;
  userSubmit: (data: UserFormType) => void;
};

const UserForm: React.FC<UserFormProps> = ({ submitRef, userSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(schema as any),
  });

  return (
    <form id="create-user-form" onSubmit={handleSubmit(userSubmit)}>
      <TextField
        type="email"
        size="medium"
        fullWidth
        label="Email"
        {...register('email')}
      />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <button ref={submitRef} type="submit" style={{ display: 'none' }} />
    </form>
  );
};

export default UserForm;
