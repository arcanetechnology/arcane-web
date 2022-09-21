/** @format */

import { Skeleton } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';

const ListLoading: React.FC = () => {
  return (
    <Stack pl={2} pr={2}>
      <Skeleton height={60} width="100%" />
      <Skeleton height={60} width="100%" />
      <Skeleton height={60} width="100%" />
      <Skeleton height={60} width="100%" />
      <Skeleton height={60} width="100%" />
    </Stack>
  );
};

export default ListLoading;
