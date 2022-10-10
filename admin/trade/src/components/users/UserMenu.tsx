/** @format */

import { Box, Menu, List, Tooltip, IconButton, Button } from '@mui/material';
import * as React from 'react';
import { AppRegistration, Settings } from '@mui/icons-material';
import { useMatches } from 'react-router-dom';
import { TradeMatches } from '@/types/frontend';
import { useAddUserMutation } from '@/services';
import LoadingButton from '@mui/lab/LoadingButton';

type UserMenuProps = {
  userId: string;
  isError?: boolean;
  isSuccess?: boolean;
};
// * checks handle and populates the menu depending on wether the user is a trade user of not.
const UserMenu: React.FC<UserMenuProps> = ({
  userId,
  isError = false,
  isSuccess = false,
}) => {
  const matches = useMatches() as TradeMatches[];
  const [registerUser, { isLoading }] = useAddUserMutation();
  // * get the settings menu items
  const settings = matches
    .filter((match) => Boolean(match.handle?.setting))
    .map((match) => match.handle.setting);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // * handle user registeration incase there is an error here.

  // TODO: navigate to the user profiles
  const handleUserRegistration = async () => {
    try {
      await registerUser({ id: userId }).unwrap();
    } catch (err) {}
  };

  if (isError)
    return (
      <LoadingButton
        loading={isLoading}
        startIcon={<AppRegistration />}
        onClick={handleUserRegistration}
        variant="contained"
        size="small"
      >
        Register User
      </LoadingButton>
    );

  return (
    <Box>
      {isSuccess && (
        <Tooltip title="User Account Settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Settings sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      )}
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <List component="nav" aria-label="user-settings-navigation">
          {settings.map((s, i) => s(s.toString()))}
        </List>
      </Menu>
    </Box>
  );
};

export default UserMenu;
