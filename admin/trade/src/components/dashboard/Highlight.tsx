/** @format */

import { Card, CardContent, Typography } from '@mui/material';
import * as React from 'react';

type HighlightProps = {
  title: string;
  value: string;
};

const Highlight: React.FC<HighlightProps> = ({ title, value }) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="h2">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default Highlight;
