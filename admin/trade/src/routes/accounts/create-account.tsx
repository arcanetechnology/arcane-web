/** @format */

import { AccountForm } from '@/components';
import { GAP } from '@/constants';
import { Stack } from '@mui/system';
import * as React from 'react';

const CreateAccount: React.FC = () => {
  const handleSubmit = () => {};
  return (
    <Stack gap={GAP}>
      <AccountForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreateAccount;
