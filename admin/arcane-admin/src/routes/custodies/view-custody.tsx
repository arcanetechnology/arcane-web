/** @format */

import { TextLoading } from '@/components';
import { GAP } from '@/constants';
import { useGetCustodyQuery } from '@/services';
import { CustodyPath } from '@/types/frontend';
import { Divider, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const ViewCustody: React.FC = () => {
  const { custodyId } = useParams<CustodyPath>();
  const {
    data: custody,
    isLoading,
    isError,
    isFetching,
  } = useGetCustodyQuery(custodyId!);

  if (isError) throw new Error('some error occured in api call');
  if (isLoading || isFetching) return <TextLoading />;
  if (!custody) return null;
  // box is same as user box
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP} flexDirection="row" alignItems="center">
          <Typography variant="h4">{custody.alias}</Typography>
          <Typography variant="h4">{custody.currency}</Typography>
        </Box>
        <Typography variant="caption">{custody.id}</Typography>
      </Box>
      <Typography variant="h4">{custody.balance}</Typography>
      <Divider />
    </Stack>
  );
};

export default ViewCustody;
