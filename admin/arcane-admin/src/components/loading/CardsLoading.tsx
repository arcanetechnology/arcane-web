/** @format */

import * as React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Skeleton } from '@mui/material';
import { GAP } from '@/constants';

const CardsLoading: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {[...Array(2)].map((_, index) => (
        <Card key={index} component={Box} m={GAP} p={GAP} elevation={0}>
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
          {/* For other variants, adjust the size with `width` and `height` */}
          <Skeleton variant="circular" width={100} height={100} />
          <Skeleton variant="rectangular" width={210} height={60} />
          <Skeleton variant="rounded" width={210} height={60} />
        </Card>
      ))}
    </Grid>
  );
};

export default CardsLoading;
