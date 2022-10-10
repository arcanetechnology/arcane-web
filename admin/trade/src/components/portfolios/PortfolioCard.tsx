/** @format */

import { GAP } from '@/constants';
import { Portfolio } from '@/types';
import {
  Card,
  Box,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

type PortfolioCardProps = {
  portfolio: Omit<Portfolio, 'accounts'>;
};
const PortfolioCard: React.FC<PortfolioCardProps> = ({ portfolio }) => {
  return (
    <Card component={Box} maxWidth={345} mr={GAP}>
      <CardActionArea
        component={NavLink}
        LinkComponent={NavLink}
        to={portfolio.id + '/cryptos'}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {portfolio.alias}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PortfolioCard;
