/** @format */

import { Box } from '@mui/system';
import * as React from 'react';

const GenericError: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
      display="flex"
      flexDirection="column"
      gap={2}
    ></Box>
  );
};

export default GenericError;
