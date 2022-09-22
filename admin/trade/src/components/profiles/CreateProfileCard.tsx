/** @format */

import { MAX_CARD_WIDTH } from '@/constants';
import {
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import { Add } from '@mui/icons-material';

const CreateProfileCard: React.FC = () => {
  return (
    <Card component={Box} maxWidth={MAX_CARD_WIDTH}>
      <CardActionArea
        component={NavLink}
        LinkComponent={NavLink}
        to={'edit'}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          width: 280,
        }}
      >
        <Add fontSize="large" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create New Profile
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CreateProfileCard;
