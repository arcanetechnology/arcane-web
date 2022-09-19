/** @format */

import { Stack } from '@mui/system';
import * as React from 'react';
import { GAP } from '@/constants';
import { ViewUser } from '@/components';

const User: React.FC = () => {
  return (
    <Stack gap={GAP}>
      <ViewUser />
    </Stack>
  );
};

export default User;
