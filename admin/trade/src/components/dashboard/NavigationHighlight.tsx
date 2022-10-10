/** @format */
import * as React from 'react';
import { Card, CardActionArea } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HighlightBase, { HighlightBaseProps } from './HighlightBase';

type NavigationHighlightProps = {
  to: string;
} & HighlightBaseProps;

const NavigationHighlight: React.FC<NavigationHighlightProps> = ({
  to,
  ...props
}) => {
  return (
    <Card sx={{ width: 200 }}>
      <CardActionArea LinkComponent={NavLink} component={NavLink} to={to}>
        <HighlightBase {...props} />
      </CardActionArea>
    </Card>
  );
};

export default NavigationHighlight;
