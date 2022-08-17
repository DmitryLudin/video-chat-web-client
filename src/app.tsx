import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import dayjs from 'dayjs';
import { MainRoutes } from 'main-routes';
import { ColorModeContext } from 'shared/contexts/color-mode.context';
import { useThemeColorMode } from 'shared/hooks/use-theme-color-mode.hook';
import React from 'react';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.locale('ru');
dayjs.extend(updateLocale);

export function App() {
  const { mode, theme, toggleColorMode } = useThemeColorMode();

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainRoutes />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
