/** @format */

import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, LinkProps, Typography } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const breadcrumbNameMap: { [key: string]: string } = {
  user: 'User',
  rofiles: 'Profiles',
  transactions: 'Transactions',
  edit: 'Edit',
  groups: 'Groups',
  portfolios: 'Portfolios',
  accounts: 'Accounts',
  cryptos: 'Cryptos',
};

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

const TradeBreadCrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  return (
    <Box mt={1} mb={2}>
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        aria-label="trade admin breadcrumbs"
      >
        <LinkRouter underline="hover" color="inherit" to="/">
          Home
        </LinkRouter>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            <Typography color="text.primary" key={to}>
              {breadcrumbNameMap[value]}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[value] ?? value}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default TradeBreadCrumbs;
