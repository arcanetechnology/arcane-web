/** @format */

import * as React from 'react';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
  useMatch,
} from 'react-router-dom';
import { ListItem, ListItemText } from '@mui/material';

type NavigationLinkProps = {
  primary: string;
  to: string;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({ primary, to }) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        }
      ),
    [to]
  );

  const match = useMatch(to);

  return (
    <ListItem
      sx={{
        minHeight: 48,
        justifyContent: 'initial',
        px: 2.5,
      }}
      selected={Boolean(match)}
      component={renderLink}
    >
      <ListItemText sx={{ opacity: 1 }} primary={primary} />
    </ListItem>
  );
};

export default NavigationLink;
