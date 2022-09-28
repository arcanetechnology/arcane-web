/** @format */

import { GAP } from '@/constants';
import {
  profilesApi,
  useGetUsersQuery,
  useLazyGetUsersQuery,
} from '@/services';
import { Loop, Search, SipOutlined } from '@mui/icons-material';
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
import { useForm } from 'react-hook-form';
import { SearchUserForm } from '@/types/frontend';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('please enter an email'),
});

const SearchUsers: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchUserForm>({
    resolver: zodResolver(schema as any),
  });

  const navigate = useNavigate();

  const [addUser, { data, isFetching, isLoading, isError, error }] =
    useLazyGetUsersQuery();

  const handleSearch = async (value: SearchUserForm) => {
    try {
      await addUser(value.email)
        .unwrap()
        .then((d) => {
          navigate(d[0].id + '/profiles');
        });
      reset();
    } catch (err) {}
  };

  return (
    <Stack
      gap={GAP}
      mb={5}
      mt={GAP}
      component="form"
      onSubmit={handleSubmit(handleSearch)}
    >
      <TextField
        autoFocus
        error={Boolean(errors['email']) || isError}
        label="Search User"
        {...register('email')}
        InputLabelProps={{
          style: {
            fontSize: 30,
            top: -2,
          },
        }}
        FormHelperTextProps={{
          style: {
            fontSize: 20,
          },
        }}
        InputProps={{
          sx: { fontSize: 30, borderRadius: 6 },
          endAdornment: (
            <IconButton sx={{ fontSize: 30 }} size="large" type="submit">
              {isFetching || isLoading ? (
                <Loop fontSize="inherit" />
              ) : (
                <Search fontSize="inherit" />
              )}
            </IconButton>
          ),
        }}
      />
    </Stack>
  );
};

export default SearchUsers;
