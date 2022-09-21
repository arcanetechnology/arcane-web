/** @format */

import { GAP } from '@/constants';
import { StakeholderFiatAccount } from '@/types/backend';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  CardMedia,
  CardActions,
  Button,
  Link,
} from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

type ProfileCardProps = {
  account: Omit<StakeholderFiatAccount, 'portfolios'>;
};

const AccountCard: React.FC<ProfileCardProps> = ({ account }) => {
  return (
    <Card component={Box} minWidth={275} mr={GAP} variant="outlined">
      <CardContent>
        <Typography variant="subtitle2">currency</Typography>
        <Typography variant="h4" gutterBottom component="div">
          {account.currency}
        </Typography>
        <Typography variant="subtitle2">balance</Typography>
        <Typography variant="h4" gutterBottom component="div">
          {account.balance}
        </Typography>
        <Typography variant="subtitle2">alias</Typography>
        <Typography variant="h4" gutterBottom component="div">
          {account.alias}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={NavLink}
          LinkComponent={NavLink}
          to={account.id + '/portfolios'}
          size="small"
        >
          Check Details
        </Button>
        <Link component={Button}>{account.custodyAccountId}</Link>
      </CardActions>
    </Card>
  );
};

export default AccountCard;
