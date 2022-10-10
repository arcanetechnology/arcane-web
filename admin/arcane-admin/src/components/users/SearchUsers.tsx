/** @format */

import { GAP, users } from '@/constants';
import { useLazyGetUserQuery } from '@/services';
import { Loop, Search, SipOutlined } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Fade,
  IconButton,
  InputBase,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { NavLink, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { SearchUserForm } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CheckUser from './CheckUser';
import { stringToAvatar } from '@/utils';

const schema = z.object({
  email: z.string().email('please enter an email').nonempty(),
});

const SearchUsers: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<SearchUserForm>({
    resolver: zodResolver(schema as any),
  });

  const [getUser, { data: user, isFetching, isLoading, isError, error }] =
    useLazyGetUserQuery();

  const handleSearch = async (value: SearchUserForm) => {
    try {
      await getUser(value.email)
        .unwrap()
        .then(() => reset());
    } catch (err) {}
  };

  console.log(user);

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
      {Boolean(user) && (
        <Fade in={Boolean(user)}>
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <Box
              component={CardContent}
              display="flex"
              justifyContent="space-between"
              alignContent="center"
            >
              <Box
                display="flex"
                flexDirection="row"
                gap={GAP}
                alignContent="center"
                justifyContent="center"
              >
                <Avatar {...stringToAvatar(watch('email'))} />
                <Typography variant="h3">{watch('email')}</Typography>
              </Box>
              <CheckUser userId={user?.userId} />
            </Box>
          </Card>
        </Fade>
      )}
      {Boolean(errors.email?.message) && (
        <Fade in={Boolean(errors.email?.message)}>
          <Alert variant="outlined" severity="error" sx={{ borderRadius: 3 }}>
            {errors.email?.message}
          </Alert>
        </Fade>
      )}
    </Stack>
  );
};

export default SearchUsers;