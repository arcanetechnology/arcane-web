/** @format */

import * as React from 'react';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';
import { CssBaseline, ThemeOptions } from '@mui/material';
import palette from './palette';

// ----------------- arcane theme definitions -------------------

type ArcaneThemeProviderProps = {
  children: React.ReactNode;
};

const ArcaneThemeProvider: React.FC<ArcaneThemeProviderProps> = ({
  children,
}) => {
  const themeOptions: ThemeOptions = React.useMemo(() => ({ palette }), []);
  const theme = createTheme(themeOptions);
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ArcaneThemeProvider;
