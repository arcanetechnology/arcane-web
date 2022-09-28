/** @format */

import { User } from '@/types/backend';
import { stringToAvatar } from '@/utils';
import {
  Badge,
  Avatar,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
  List,
  ListItem,
  Skeleton,
  Divider,
} from '@mui/material';
import * as React from 'react';
import { GAP } from '@/constants';
import { ExpandMore, Group } from '@mui/icons-material';
import { NavigationLink } from '../navigation';

type UserMenuProps = {
  user: User;
  loading?: boolean;
};

const UserMenu: React.FC<UserMenuProps> = ({ user, loading = false }) => {
  return (
    <Accordion elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box
          aria-controls="user-menu-content"
          id="user-menu-header"
          display="flex"
          flexDirection="row"
          gap={GAP}
        >
          <Badge badgeContent={user.profiles.length} color="secondary">
            {loading ? (
              <Skeleton variant="circular" width={60} height={60} />
            ) : (
              <Avatar {...stringToAvatar(user?.email)} />
            )}
          </Badge>
          {loading ? (
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} width={300} />
          ) : (
            <Typography variant="h3">
              {user.email === '' ? 'No Email' : user?.email}
            </Typography>
          )}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <List component="nav" aria-label="user-settings-navigation">
          <NavigationLink
            to="profiles/create"
            primary="Create Profile"
            icon={<Group />}
          />
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserMenu;
