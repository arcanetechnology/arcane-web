/** @format */

import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

type NavigationHighlightProps = {
  title: string;
  value: string;
  to: string;
};

const NavigationHighlight: React.FC<NavigationHighlightProps> = ({
  title,
  value,
  to,
}) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea LinkComponent={NavLink} component={NavLink} to={to}>
        <CardContent>
          <Typography variant="subtitle2">{title}</Typography>
          <Typography variant="h2">{value}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NavigationHighlight;
