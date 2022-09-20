/** @format */

import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Button, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const Edit: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetUserQuery(userId!);

  return (
    <form>
      <Stack>
        <TextField
          defaultValue={user?.email ?? ''}
          label="email"
          type="email"
        />
        <Box>
          <Button variant="contained">Save</Button>
          <Button variant="contained">Cancel</Button>
        </Box>
      </Stack>
    </form>
  );
};

export default Edit;
