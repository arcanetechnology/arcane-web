/** @format */

import * as React from 'react';
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
  useMatch,
} from 'react-router-dom';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { grey } from '@mui/material/colors';

type NavigationLinkProps = {
  primary: string;
  to: string;
  icon: React.ReactNode;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({
  primary,
  to,
  icon,
}) => {
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
        function Link(itemProps, ref) {
          return (
            <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
          );
        },
      ),
    [to],
  );

  const match = useMatch(to);

  return (
    <ListItemButton selected={Boolean(match)} component={renderLink}>
      <ListItemIcon sx={{ color: 'inherit' }}>{icon}</ListItemIcon>
      <ListItemText
        primaryTypographyProps={{ fontWeight: 'medium' }}
        primary={primary}
      />
    </ListItemButton>
  );
};

export default NavigationLink;
