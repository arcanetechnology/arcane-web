/** @format */

import { PointOfSale, Money } from '@mui/icons-material';
import { AppBar, Tabs, Tab } from '@mui/material';
import * as React from 'react';

const UsersToolbar: React.FC = () => {
  return (
    <AppBar
      position="relative"
      color="inherit"
      elevation={0}
      sx={{ borderRadius: 3 }}
    >
      <Tabs>
        <Tab icon={<PointOfSale />} iconPosition="start" label="transaction" />
        <Tab icon={<Money />} iconPosition="start" label="account" />
      </Tabs>
    </AppBar>
  );
};

export default UsersToolbar;
