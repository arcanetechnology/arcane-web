/** @format */

import { AppBar, Box, Toolbar } from '@mui/material';
import * as React from 'react';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { Container } from '@mui/system';

const NavigationBar: React.FC = () => {
  return (
    <AppBar color="transparent" position="sticky">
      <Toolbar
        variant="regular"
        component={Container}
        maxWidth="xl"
        sx={{ display: 'flex', flexDirection: 'space-between' }}
      >
        <Logo />
        <Box></Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
