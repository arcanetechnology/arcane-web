/** @format */

import { TextField } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { UserForm as UserFormType } from '@/types/frontend';

type UserFormProps = {
  submitRef: React.LegacyRef<HTMLButtonElement>;
};

const UserForm: React.FC<UserFormProps> = ({ submitRef }) => {
  const { register, handleSubmit } = useForm<UserFormType>();

  const onSubmit = (data: UserFormType) => console.log(data);

  return (
    <form id="create-user-form" onSubmit={handleSubmit(onSubmit)}>
      <TextField size="medium" fullWidth label="Email" {...register('email')} />
      <button ref={submitRef} type="submit" style={{ display: 'none' }} />
    </form>
  );
};

export default UserForm;
