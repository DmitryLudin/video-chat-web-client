import { Box, PaletteMode, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { Content } from 'layouts/content';
import { Header } from 'layouts/header';
import React from 'react';
import { darkThemeOptions, lightThemeOptions } from 'theme';

function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(
    () => createTheme(mode === 'light' ? lightThemeOptions : darkThemeOptions),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header mode={mode} colorMode={colorMode} />
        <Content />
      </Box>
    </ThemeProvider>
  );
}

export default App;
