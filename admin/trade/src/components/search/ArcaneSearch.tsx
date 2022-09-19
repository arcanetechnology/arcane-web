/** @format */

import * as React from 'react';
import { Paper, InputBase, Divider, IconButton } from '@mui/material';
import { Menu, Search, Add } from '@mui/icons-material';

const ArcaneSearch: React.FC = () => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        mb: 2,
      }}
      elevation={1}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Trade Users"
        inputProps={{ 'aria-label': 'search trade users' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <Add />
      </IconButton>
    </Paper>
  );
};

export default ArcaneSearch;
