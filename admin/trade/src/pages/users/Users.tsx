/** @format */

import { Stack } from '@mui/system';
import * as React from 'react';
import { UserList } from '@/components';
import { selectUser, useTradeSelector } from '@/state';
import { Navigate } from 'react-router-dom';

const Users: React.FC = () => {
  return (
    <Stack>
      <UserList />
    </Stack>
  );
};

export default Users;
