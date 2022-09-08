/** @format */

import * as React from 'react';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
  useMatch,
} from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';

type NavigationLinkProps = {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  open: boolean;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({
  icon,
  primary,
  to,
  open = false,
}) => {
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
    <li>
      <ListItem
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        selected={Boolean(match)}
        component={renderLink}
      >
        {icon ? (
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText sx={{ opacity: open ? 1 : 0 }} primary={primary} />
      </ListItem>
    </li>
  );
};

export default NavigationLink;
