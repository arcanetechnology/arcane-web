/** @format */

import { CryptoAccountsList } from '@/components';
import {
  useGetCryptoAccountsQuery,
  useUpdateCryptoAccountMutation,
} from '@/services';
import { ProfilePath, UpdateCryptoForm } from '@/types';
import * as React from 'react';
import { Outlet, useParams, Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { Box, Button } from '@mui/material';

const ViewCryptoAccounts: React.FC = () => {
  const { userId, profileId } = useParams<ProfilePath>();
  const {
    data: accounts = [],
    isLoading,
    isError,
    isFetching,
  } = useGetCryptoAccountsQuery({ userId, profileId } as ProfilePath);

  const [updateCryptoAccount, { isLoading: cryptoAccountLoading }] =
    useUpdateCryptoAccountMutation();

  if (isError) throw new Error('some error occured in api call');

  const handleCryptoAccountUpdate = async (
    body: UpdateCryptoForm,
    cryptoId: string,
  ) => {
    try {
      await updateCryptoAccount({
        userId: userId!,
        profileId: profileId!,
        cryptoId,
        ...body,
      }).unwrap();
    } catch (err) {
      // ! @osin, @vihang should know what should we do incase it fails
    }
  };

  return (
    <Stack gap={GAP}>
      <Box>
        <Button
          LinkComponent={RouterLink}
          component={RouterLink}
          to="create"
          variant="contained"
        >
          Create Account
        </Button>
      </Box>
      <Outlet />
      <CryptoAccountsList
        accounts={accounts}
        isLoading={isLoading || isFetching || cryptoAccountLoading}
        handleUpdate={handleCryptoAccountUpdate}
      />
    </Stack>
  );
};

export default ViewCryptoAccounts;
