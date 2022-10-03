/** @format */

import { ProfileForm } from '@/components';
import { GAP } from '@/constants';
import { useAddProfileMutation } from '@/services';
import { CreateProfileForm, UserPath } from '@/types/frontend';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProfile: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const [addProfile] = useAddProfileMutation();
  const handleSubmit = async (profile: CreateProfileForm) => {
    try {
      await addProfile({ userId: userId!, ...profile }).unwrap();
    } catch (err) {
      toast('problem while creating profile for this user', { type: 'error' });
    }
  };
  return (
    <Stack gap={GAP}>
      <ProfileForm handleSubmit={handleSubmit} />
    </Stack>
  );
};

export default CreateProfile;
