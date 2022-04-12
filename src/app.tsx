import { Box, CircularProgress, Grid, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext } from 'shared/contexts/color-mode.context';
import { useThemeColorMode } from 'shared/hooks/use-theme-color-mode.hook';
import { MainRoutes } from 'routes/main-routes';
import { AppBarMenu } from 'modules/app-bar/app-bar';
import React, { useEffect, useState } from 'react';
import { authService } from 'shared/domains/auth/auth.service';

export function App() {
  const { mode, theme, toggleColorMode } = useThemeColorMode();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService.authenticate().finally(() => setLoading(false));
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
          <AppBarMenu />
          {isLoading ? (
            <Grid sx={{ p: 3 }} container justifyContent="center">
              <CircularProgress />
            </Grid>
          ) : (
            <MainRoutes />
          )}
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
