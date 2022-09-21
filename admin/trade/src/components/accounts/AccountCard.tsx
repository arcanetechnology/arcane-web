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

type ProfileCardProps = {
  account: Omit<StakeholderFiatAccount, 'portfolios'>;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ account }) => {
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
        <Link component={Button}>{account.custodyAccountId}</Link>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default ProfileCard;
