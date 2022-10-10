/** @format */

import * as React from 'react';
import { GAP } from '@/constants';
import { useCreateCryptoAccountMutation } from '@/services';
import { CreateCryptoForm, ProfilePath } from '@/types';
import { Stack } from '@mui/system';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CryptoAccountForm } from '@/components';

const CreateCryptoAccount: React.FC = () => {
  const params = useParams<ProfilePath>();
  const [createCryptoAccount, { isLoading }] = useCreateCryptoAccountMutation();
  const handleSubmit = async (account: CreateCryptoForm) => {
    try {
      await createCryptoAccount({
        ...(params as ProfilePath),
        ...account,
      }).unwrap();
    } catch (err) {
      toast('error in creating an account');
    }
  };
  return (
    <Stack gap={GAP}>
      <CryptoAccountForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </Stack>
  );
};

export default CreateCryptoAccount;
