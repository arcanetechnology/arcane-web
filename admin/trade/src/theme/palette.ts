/** @format */

import { PaletteOptions, PaletteColorOptions } from '@mui/material';

// ---------- arcane palette, color scheme and stuff -----------

const ArcanePrimary: PaletteColorOptions = {
  main: '#212121',
  light: '#484848',
  dark: '#000000',
  contrastText: '#FFFFFF',
};

const ArcaneSecondary: PaletteColorOptions = {
  main: '#263238',
  light: '#4f5b62',
  dark: '#000a12',
};

const ArcanePalette: PaletteOptions = {
  primary: ArcanePrimary,
  secondary: ArcaneSecondary,
};

export default ArcanePalette;
