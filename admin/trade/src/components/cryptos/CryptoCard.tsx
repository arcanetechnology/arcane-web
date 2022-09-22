/** @format */

import { GAP } from '@/constants';
import { StakeholderCryptoAccount } from '@/types/backend';
import { Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

type CryptoCardProps = {
  crypto: StakeholderCryptoAccount;
};

const CryptoCard: React.FC<CryptoCardProps> = ({ crypto }) => {
  return (
    <Card component={Box} width="100%">
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: GAP,
        }}
      >
        <Typography variant="h4">{crypto.currency}</Typography>
        <Typography variant="h4">{crypto.balance}</Typography>
        <Typography variant="h4">{crypto.alias}</Typography>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
