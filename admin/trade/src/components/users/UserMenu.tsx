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
import { useMatches } from 'react-router-dom';
import { TradeMatches } from '@/types/frontend';

type UserMenuProps = {
  user: User;
  loading?: boolean;
};

const UserMenu: React.FC<UserMenuProps> = ({ user, loading = false }) => {
  const matches = useMatches() as TradeMatches[];
  const settings = matches
    .filter((match) => Boolean(match.handle?.setting))
    .map((match) => match.handle.setting);

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
          {settings.map((s, i) => s(s.toString()))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserMenu;
