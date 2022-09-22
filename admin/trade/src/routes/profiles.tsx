/** @format */

import * as React from 'react';
import { useGetProfilesQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { useParams } from 'react-router-dom';
import { ListLoading, ProfileList } from '@/components';

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

  return <ProfileList profiles={profiles} />;
};

export default Profiles;
