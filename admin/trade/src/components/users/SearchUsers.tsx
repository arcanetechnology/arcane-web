/** @format */

import { GAP } from '@/constants';
import { useGetUsersQuery, useLazyGetUsersQuery } from '@/services';
import { Search } from '@mui/icons-material';
import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import * as React from 'react';

const SearchUsers: React.FC = () => {
  const [user, setUser] = React.useState('');
  const [getUsers, users] = useLazyGetUsersQuery();
  const navigate = useNavigate();
  const searchUser = () => {
    getUsers(user)
      .unwrap()
      .then((d) => {
        if (d[0]) {
          setUser('');
          navigate(d[0].id + '/profiles');
        }
      });
  };

  return (
    <Stack gap={GAP} mb={5} mt={5}>
      <TextField
        autoFocus
        label="Search Trade User"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton size="large" onClick={searchUser}>
              <Search />
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
};

export default SearchUsers;
