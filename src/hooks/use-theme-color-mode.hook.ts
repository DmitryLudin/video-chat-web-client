import { PaletteMode } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useCallback } from 'react';
import { darkThemeOptions, lightThemeOptions } from 'theme';

export const useThemeColorMode = () => {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const toggleColorMode = useCallback(() => {
    setMode((prevMode: PaletteMode) =>
      prevMode === 'light' ? 'dark' : 'light'
    );
  }, []);

  const theme = React.useMemo(
    () => createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions),
    [mode]
  );

  return { mode, theme, toggleColorMode };
};
