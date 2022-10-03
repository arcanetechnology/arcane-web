/** @format */

import {
  AccountBalance,
  CurrencyBitcoin,
  CurrencyExchange,
  Face,
  Group,
  Home,
  Money,
  PointOfSale,
} from '@mui/icons-material';
import { Box, Breadcrumbs, Typography } from '@mui/material';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import LinkRouter from './LinkRouter';

const breadcrumbNameMap: { [key: string]: string } = {
  users: 'Users',
  profiles: 'Profiles',
  transactions: 'Transactions',
  groups: 'Groups',
  portfolios: 'Portfolios',
  accounts: 'Accounts',
  cryptos: 'Cryptos',
};

const icons: { [key: string]: React.ReactNode } = {
  users: <Group sx={{ mr: 0.5 }} fontSize="inherit" />,
  profiles: <AccountBalance sx={{ mr: 0.5 }} fontSize="inherit" />,
  transactions: <PointOfSale sx={{ mr: 0.5 }} fontSize="inherit" />,
  groups: <CurrencyExchange sx={{ mr: 0.5 }} fontSize="inherit" />,
  portfolios: <Face sx={{ mr: 0.5 }} fontSize="inherit" />,
  accounts: <Money sx={{ mr: 0.5 }} fontSize="inherit" />,
  cryptos: <CurrencyBitcoin sx={{ mr: 0.5 }} fontSize="inherit" />,
};

const TradeBreadCrumbs: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  return (
    <Box mt={1} mb={2}>
      <Breadcrumbs aria-label="trade admin breadcrumbs">
        <LinkRouter
          sx={{ display: 'flex', alignItems: 'center' }}
          underline="hover"
          color="inherit"
          to="/"
        >
          <Home sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography
              color="text.primary"
              key={to}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              {icons[value]}
              {breadcrumbNameMap[value]}
            </Typography>
          ) : (
            <LinkRouter
              sx={{ display: 'flex', alignItems: 'center' }}
              underline="hover"
              color="inherit"
              to={to}
              key={to}
            >
              {icons[value]}
              {breadcrumbNameMap[value] ?? value}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default TradeBreadCrumbs;
