/** @format */

import { TextLoading } from '@/components';
import { GAP } from '@/constants';
import { useGetPortfolioQuery } from '@/services';
import { PortfolioPath } from '@/types/frontend';
import { Face } from '@mui/icons-material';
import { Divider, Typography, Badge } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ViewPortfolio: React.FC = () => {
  const { userId, profileId, accountId, portfolioId } =
    useParams<PortfolioPath>();
  const {
    data: portfolio,
    isLoading,
    isError,
    isFetching,
  } = useGetPortfolioQuery({
    userId,
    profileId,
    accountId,
    portfolioId,
  } as PortfolioPath);

  if (isError) throw new Error('some error occured in portfolio api call');
  if (!portfolio) return null;
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP} flexDirection="row" alignItems="center">
          <Badge badgeContent={portfolio.accounts.length} color="secondary">
            <Face />
          </Badge>
          <Typography variant="h4">{portfolio.alias}</Typography>
        </Box>
        <Typography variant="caption">{portfolio.id}</Typography>
      </Box>
      <Divider />
      <Outlet />
    </Stack>
  );
};

export default ViewPortfolio;
