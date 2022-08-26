import { PaletteMode } from '@mui/material';
import { createContext } from 'react';

export type TColorModeContext = {
  mode: PaletteMode;
  toggleColorMode: VoidFunction;
};

export const ColorModeContext = createContext<TColorModeContext | null>(null);
