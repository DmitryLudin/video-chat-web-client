import { PaletteMode, useMediaQuery } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useCallback, useEffect } from 'react';
import { darkThemeOptions, lightThemeOptions } from 'theme';

export const useThemeColorMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<PaletteMode>('light');

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

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
