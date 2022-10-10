/** @format */

import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { accounts, cryptoAccounts, GAP, transactions } from '@/constants';
import { NavigationHighlight } from '@/components';

const ProfileDashboard: React.FC = () => {
  return (
    <Stack gap={GAP}>
      <Box display="flex" flexDirection="row" alignItems="center" gap={GAP}>
        <NavigationHighlight
          title="Total Crypto Accounts"
          value={20}
          to={cryptoAccounts}
        />
        <NavigationHighlight
          title="Total Fiat Accounts"
          value={20}
          to={accounts}
        />
        <NavigationHighlight
          title="Total Transactions"
          value={20}
          to={transactions}
        />
      </Box>
    </Stack>
  );
};

export default ProfileDashboard;
