/** @format */

import { AccountForm } from '@/components';
import { GAP } from '@/constants';
import { CreateAccountForm } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';

const CreateAccount: React.FC = () => {
  const handleSubmit = (data: CreateAccountForm) => {
    console.log(data);
  };
  return (
    <Stack gap={GAP}>
      <AccountForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreateAccount;
