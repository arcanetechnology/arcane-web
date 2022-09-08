/** @format */

import { Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useGetUserQuery } from '../../services/users';

type UsereViewProps = {
  id: string;
};

const UserView: React.FC<UsereViewProps> = ({ id }) => {
  const { data: user, isLoading, isSuccess } = useGetUserQuery(id);

  return (
    <Box>
      {isLoading && (
        <>
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
          <Skeleton height={40} />
        </>
      )}
      {isSuccess && (
        <>
          <Typography>{user.email}</Typography>
        </>
      )}
    </Box>
  );
};

export default UserView;
