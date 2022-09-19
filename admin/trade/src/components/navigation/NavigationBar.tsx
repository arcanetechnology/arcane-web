/** @format */

import { AppBar, Toolbar } from '@mui/material';
import * as React from 'react';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { Container } from '@mui/system';

const NavigationBar: React.FC = () => {
  return (
    <AppBar color="transparent" position="sticky">
      <Toolbar variant="regular">
        <Container maxWidth="lg">
          <Logo />
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
