/** @format */

import { GAP, profiles, users } from '@/constants';
import { useLazyGetUsersQuery } from '@/services';
import { Loop, Search } from '@mui/icons-material';
import { Alert, Fade, IconButton, Stack, TextField } from '@mui/material';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { SearchUserForm } from '@/types/frontend';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { stringToAvatar } from '@/utils';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('please enter an email').nonempty(),
});

const SearchUsers: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchUserForm>({
    resolver: zodResolver(schema as any),
  });

  const [getUser, { data: user, isFetching, isLoading, isError, error }] =
    useLazyGetUsersQuery();

  const handleSearch = async (value: SearchUserForm) => {
    try {
      await getUser(value.email)
        .unwrap()
        .then((id) => navigate(id + '/' + profiles, { replace: true }));
    } catch (err) {
      // TODO: check if the user is not in home page and navigate him back :D
      navigate('/');
    }
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
