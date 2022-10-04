/** @format */

import { User } from '@/types';
import { DateRange, PermIdentity } from '@mui/icons-material';
import { Alert, Chip, Skeleton } from '@mui/material';
import { Box } from '@mui/system';
import { GAP } from '@/constants';
import * as React from 'react';

type UserInfoProps = {
  user: User;
  isLoading: boolean;
  isError: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, isError, isLoading }) => {
  if (isLoading)
    return (
      <Box display="flex" flexDirection="row" alignItems="center" gap={GAP}>
        <Skeleton variant="rounded" width={200} height={50} />
        <Skeleton variant="rounded" width={200} height={50} />
      </Box>
    );

  if (isError)
    return (
      <Alert severity="error">
        User is not registered to trade application
      </Alert>
    );

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={GAP}>
      <Chip variant="outlined" label={user.id} icon={<PermIdentity />} />
      <Chip variant="outlined" label={user.createdOn} icon={<DateRange />} />
    </Box>
  );
};

export default UserInfo;
