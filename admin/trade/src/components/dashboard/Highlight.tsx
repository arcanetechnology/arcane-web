/** @format */

import { Card } from '@mui/material';
import * as React from 'react';
import HighlightBase, { HighlightBaseProps } from './HighlightBase';

type HighlightProps = {} & HighlightBaseProps;

const Highlight: React.FC<HighlightProps> = (props) => {
  return (
    <Card sx={{ width: 200 }}>
      <HighlightBase {...props} />
    </Card>
  );
};

export default Highlight;
