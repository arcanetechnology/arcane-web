/** @format */

import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';

type LoadingProps = {
  open: boolean;
};

const Loading: React.FC<LoadingProps> = ({ open }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
