/** @format */

import * as React from 'react';
import { CardContent, Typography } from '@mui/material';
import { useSpring, animated } from 'react-spring';

export type HighlightBaseProps = {
  title: string;
  value: number;
};

const HighlightBase: React.FC<HighlightBaseProps> = ({ title, value }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
  });
  return (
    <CardContent>
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="h2">
        <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      </Typography>
    </CardContent>
  );
};

export default HighlightBase;
