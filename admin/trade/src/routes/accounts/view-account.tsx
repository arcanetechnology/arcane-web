/** @format */

import { TextLoading } from '@/components';
import { GAP } from '@/constants';
import { useGetAccountQuery } from '@/services';
import { AccountPath } from '@/types/frontend';
import { Money } from '@mui/icons-material';
import { Divider, Typography, Badge } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ViewAccount: React.FC = () => {
  const { userId, profileId, accountId } = useParams<AccountPath>();
  const {
    data: account,
    isLoading,
    isError,
    isFetching,
  } = useGetAccountQuery({ userId, profileId, accountId } as AccountPath);

  if (isError) throw new Error('some error occured in api call');
  if (isLoading || isFetching) return <TextLoading />;
  if (!account) return null;
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP} flexDirection="row" alignItems="center">
          <Badge badgeContent={account.portfolios.length} color="secondary">
            <Money />
          </Badge>
          <Typography variant="h4">{account.currency}</Typography>
          <Typography variant="h4">{account.balance}</Typography>
          <Typography variant="h4">{account.alias}</Typography>
        </Box>
        <Typography variant="caption">{account.id}</Typography>
      </Box>
      <Divider />
      <Outlet />
    </Stack>
  );
};

export default ViewAccount;
