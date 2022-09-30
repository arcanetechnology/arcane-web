/** @format */

import { AppBar, Avatar, Chip, Skeleton, Toolbar } from '@mui/material';
import * as React from 'react';
import { ReactComponent as Logo } from '@/assets/logo.svg';
import { Container } from '@mui/system';
import { UserState } from '@/types/frontend';

type NavigationBarProps = {
  user: UserState | null;
};

const NavigationBar: React.FC<NavigationBarProps> = ({ user }) => {
  return (
    <AppBar color="inherit" position="sticky">
      <Toolbar
        variant="regular"
        component={Container}
        maxWidth="xl"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Logo />
        {user ? (
          <Chip
            size="medium"
            avatar={<Avatar alt={user.displayName ?? ''} src={user.photoUrl} />}
            label={user.email}
            variant="outlined"
          />
        ) : (
          <Skeleton variant="text" sx={{ fontSize: 20 }} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
