/** @format */

import { useGetProfilesQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Alert } from '@mui/material';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { ProfileCard, CardsLoading } from '@/components';

const Profiles: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: profiles,
    isLoading,
    isError,
    isFetching,
  } = useGetProfilesQuery(userId!);

  if (isError) throw new Error('some error occured in api call');
  if (isLoading || isFetching) return <CardsLoading />;
  if (!profiles) return null;

  return (
    <React.Fragment>
      {profiles.length > 0 ? (
        <Grid container spacing={2}>
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </Grid>
      ) : (
        <Alert variant="outlined" severity="error">
          user has no profiles
        </Alert>
      )}
    </React.Fragment>
  );
};

export default Profiles;
