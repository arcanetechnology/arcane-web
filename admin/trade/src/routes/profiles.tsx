/** @format */

import * as React from 'react';
import { useGetProfilesQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { useParams } from 'react-router-dom';
import { ListLoading, ProfileList, ProfilesToolbar } from '@/components';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';

const Profiles: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: profiles,
    isLoading,
    isError,
    isFetching,
  } = useGetProfilesQuery(userId!);

  if (isError) throw new Error('some error occured in api call');
  if (isLoading || isFetching) return <ListLoading />;
  if (!profiles) return null;

  return (
    <Stack gap={GAP}>
      <ProfilesToolbar />
      <ProfileList profiles={profiles} />
    </Stack>
  );
};

export default Profiles;
