/** @format */

import * as React from 'react';
import { PointOfSale, Money } from '@mui/icons-material';
import { AppBar, Tabs, Tab } from '@mui/material';

const ProfileToolbar: React.FC = () => {
  return (
    <AppBar
      position="relative"
      color="inherit"
      elevation={0}
      sx={{ borderRadius: 3 }}
    >
      <Tabs>
        <Tab icon={<PointOfSale />} iconPosition="start" label="transactions" />
        <Tab icon={<PointOfSale />} iconPosition="start" label="accounts" />
      </Tabs>
    </AppBar>
  );
};

export default ProfileToolbar;
