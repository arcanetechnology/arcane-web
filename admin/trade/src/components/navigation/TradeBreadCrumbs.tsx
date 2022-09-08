/** @format */

import { NavigateNext } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, LinkProps, Typography } from '@mui/material';
import * as React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const breadcrumbNameMap: { [key: string]: string } = {
  '/user': 'User',
  '/profile': 'Profile',
  '/transaction': 'Transaction',
  '/portfolio': 'Portfolio',
  '/account': 'Account',
  '/crypto': 'Crypto',
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
    <Box mt={2} mb={2}>
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
              {breadcrumbNameMap[to]}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to] ?? to}
            </LinkRouter>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default TradeBreadCrumbs;
