/** @format */

import { TradeMatches } from '@/types/frontend';
import { PointOfSale, Money } from '@mui/icons-material';
import { AppBar, Tabs, Tab } from '@mui/material';
import * as React from 'react';
import { useMatch, Link as RouterLink, useLocation } from 'react-router-dom';

const UsersToolbar: React.FC = () => {
  const profile = useMatch({ path: '/:userId/profiles/:profileId/*' });

  if (!profile) return null;
  if (!profile.params.profileId) return null;

  const location = useLocation();

  const basePath =
    '/' + profile.params.userId + '/profiles/' + profile.params.profileId;
  const routes = [basePath + '/accounts', basePath + '/transactions'];

  return (
    <Tabs
      value={location.pathname !== basePath ? location.pathname : false}
      variant="standard"
    >
      <Tab
        icon={<PointOfSale />}
        value={routes[1]}
        component={RouterLink}
        iconPosition="start"
        label="transactions"
        LinkComponent={RouterLink}
        to={routes[1]}
      />
      <Tab
        icon={<PointOfSale />}
        LinkComponent={RouterLink}
        value={routes[0]}
        to={routes[0]}
        component={RouterLink}
        iconPosition="start"
        label="accounts"
      />
    </Tabs>
  );
};

export default UsersToolbar;
