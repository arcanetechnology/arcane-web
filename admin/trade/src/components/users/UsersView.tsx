/** @format */

import { GAP } from '@/constants';
import { useGetUsersQuery } from '@/services';
import { Skeleton, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import ArcaneSearch from '../search/ArcaneSearch';
import UsersList from './UsersList';

const UsersView: React.FC = () => {
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery();

  return (
    <Stack>
      <ArcaneSearch />
      {isLoading && (
        <>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </>
      )}
      {!isError && (
        <UsersList users={users ?? []} hasNextPage={false} loadMore={refetch} />
      )}
    </Stack>
  );
};

export default UsersView;
