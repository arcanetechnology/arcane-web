/** @format */

import * as React from 'react';
import { NavigationBar, TradeBreadCrumbs } from '@/components';
import { Container } from '@mui/system';

const Root: React.FC = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container component="main" sx={{ mt: 2 }}>
        <TradeBreadCrumbs />
      </Container>
    </React.Fragment>
  );
};

export default Root;
