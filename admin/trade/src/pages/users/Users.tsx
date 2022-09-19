/** @format */

import { Stack } from '@mui/system';
import * as React from 'react';
import { UserList, UsersToolbar } from '@/components';
import { GAP } from '@/constants';

const Users: React.FC = () => {
  return (
    <Stack gap={GAP}>
      <UsersToolbar />
      <UserList />
    </Stack>
  );
};

export default Users;
