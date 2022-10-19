/** @format */

import { AccountsList, TemplateMenu } from '@/components';
import { useGetAccountsQuery, useUpdateAccountMutation } from '@/services';
import { ProfilePath, UpdateAccountForm } from '@/types';
import * as React from 'react';
import { Outlet, useParams, Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { Box, Button } from '@mui/material';

const Accounts: React.FC = () => {
  const { userId, profileId } = useParams<ProfilePath>();
  const {
    data: accounts = [],
    isLoading,
    isError,
    isFetching,
  } = useGetAccountsQuery({ userId, profileId } as ProfilePath);

  const [updateAccount, { isLoading: updateAccountLoading }] =
    useUpdateAccountMutation();

  if (isError) throw new Error('some error occured in api call');

  const handleAccountUpdate = async (
    body: UpdateAccountForm,
    accountId: string,
  ) => {
    try {
      await updateAccount({
        userId: userId!,
        profileId: profileId!,
        accountId,
        ...body,
      }).unwrap();
    } catch (err) {
      //! figure out a way, what should I do? @vihang?
    }
  };

  return (
    <Stack gap={GAP}>
      <Box gap={GAP} display="flex">
        <Button
          LinkComponent={RouterLink}
          component={RouterLink}
          to="create"
          variant="contained"
        >
          Create Account
        </Button>
        <TemplateMenu
          accounts={accounts}
          isLoading={isLoading || isFetching || updateAccountLoading}
        />
      </Box>
      <Outlet />
      <AccountsList
        accounts={accounts}
        isLoading={isLoading || isFetching || updateAccountLoading}
        handleUpdate={handleAccountUpdate}
      />
    </Stack>
  );
};

export default Accounts;
