import { Box, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext } from 'contexts/color-mode.context';
import { useThemeColorMode } from 'hooks/use-theme-color-mode.hook';
import { Content } from 'layouts/content';
import { Header } from 'layouts/header/header';
import React, { useEffect } from 'react';
import { authService } from 'shared/domains/auth/auth.service';

function App() {
  const { mode, theme, toggleColorMode } = useThemeColorMode();

  useEffect(() => {
    authService.authenticate();
  }, []);

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header />
          <Content />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
