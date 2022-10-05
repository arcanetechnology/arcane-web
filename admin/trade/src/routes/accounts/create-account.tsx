/** @format */

import { AccountForm } from '@/components';
import { GAP } from '@/constants';
import { useAddAccountMutation } from '@/services';
import { CreateAccountForm, ProfilePath } from '@/types';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateAccount: React.FC = () => {
  const params = useParams<ProfilePath>();
  const [addAccount, { isLoading }] = useAddAccountMutation();
  const handleSubmit = async (account: CreateAccountForm) => {
    try {
      await addAccount({
        ...(params as ProfilePath),
        ...account,
      }).unwrap();
    } catch (err) {
      toast('error in creating an account');
    }
  };
  return (
    <Stack gap={GAP}>
      <AccountForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </Stack>
  );
};

export default CreateAccount;
