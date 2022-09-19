/** @format */

import { useGetUsersQuery } from '@/services';
import { Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import CreateUser from './CreateUser';

const UsersToolbar: React.FC = () => {
  const { data: users = [], isLoading } = useGetUsersQuery();
  if (isLoading) return <Skeleton width={'100%'} height={40} />;

  return <Box>{users.length > 0 && <CreateUser />}</Box>;
};

export default UsersToolbar;
