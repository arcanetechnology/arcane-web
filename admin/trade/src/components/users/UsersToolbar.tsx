/** @format */

import { TradeMatches } from '@/types/frontend';
import { PointOfSale, Money } from '@mui/icons-material';
import { AppBar, Tabs, Tab } from '@mui/material';
import * as React from 'react';
import { useMatches } from 'react-router-dom';

const UsersToolbar: React.FC = () => {
  const matches = useMatches() as TradeMatches[];
  const tabs = matches
    .filter((match) => Boolean(match.handle?.tab))
    .map((match) => match.handle.tab());
  return (
    <AppBar
      position="relative"
      color="inherit"
      elevation={0}
      sx={{ borderRadius: 3 }}
    >
      <Tabs>{tabs.map((t) => t)}</Tabs>
    </AppBar>
  );
};

export default UsersToolbar;
