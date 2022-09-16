/** @format */

import { Box, Skeleton } from '@mui/material';
import * as React from 'react';
import BaseDataGridOverlay from './BaseDataGridOverlay';

const LoadingOverlay: React.FC = () => {
  return (
    <BaseDataGridOverlay>
      <Box width={300}>
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Box>
    </BaseDataGridOverlay>
  );
};

export default LoadingOverlay;
