import { PaletteMode } from '@mui/material';
import React from 'react';

export type TColorModeContext = {
  mode: PaletteMode;
  toggleColorMode: VoidFunction;
};

export const ColorModeContext = React.createContext<TColorModeContext | null>(
  null
);
