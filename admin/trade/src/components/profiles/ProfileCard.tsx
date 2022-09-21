/** @format */

import { GAP } from '@/constants';
import { Profile } from '@/types/backend';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  CardMedia,
} from '@mui/material';
import * as React from 'react';

type ProfileCardProps = {
  profile: Omit<Profile, 'accounts'>;
};

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  return (
    <Card component={Box} maxWidth={345} m={GAP}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          src={
            profile.type === 'BUSINESS'
              ? 'https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80'
              : 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80'
          }
          alt={`${profile.type.toLowerCase()}-profile-image`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {profile.type}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            some {profile.type} related mumbo jumbo
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProfileCard;
