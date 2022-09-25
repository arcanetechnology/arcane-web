/** @format */

import { GAP } from '@/constants';
import {
  StakeholderFiatAccount,
  StakeholderFiatAccountItem,
} from '@/types/backend';
import {
  Card,
  CardContent,
  Box,
  Typography,
  CardActions,
  Button,
  Divider,
} from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

type ProfileCardProps = {
  account: StakeholderFiatAccountItem;
};

const AccountCard: React.FC<ProfileCardProps> = ({ account }) => {
  return (
    <Card component={Box} minWidth={275} mr={GAP} variant="outlined">
      <CardContent>
        <Typography variant="subtitle2">currency</Typography>
        <Typography variant="h4" component="div">
          {account.currency}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2">balance</Typography>
        <Typography variant="h4" component="div">
          {account.balance}
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="subtitle2">alias</Typography>
        <Typography variant="h4" component="div">
          {account.alias}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          component={NavLink}
          LinkComponent={NavLink}
          to={account.id + '/portfolios'}
          size="small"
        >
          Check Details
        </Button>
        <Button
          component={NavLink}
          LinkComponent={NavLink}
          to={account.id + '/portfolios'}
          size="small"
        >
          Custody Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountCard;
