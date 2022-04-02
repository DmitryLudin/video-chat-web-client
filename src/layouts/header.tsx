import { Videocam } from '@mui/icons-material';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ThemeModeSwitch } from 'components/theme-mode-switch';
import {
  ColorModeContext,
  TColorModeContext,
} from 'contexts/color-mode.context';
import React, { useContext } from 'react';

const user = true;

export function Header() {
  const { mode, toggleColorMode } = useContext(
    ColorModeContext
  ) as TColorModeContext;

  return (
    <AppBar position="relative" color="default">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Videocam
            color="primary"
            fontSize="large"
            sx={{ mr: 1, display: { xs: 'block', sm: 'none' } }}
          />
          <Typography
            variant="h4"
            component="p"
            sx={{
              fontWeight: 600,
              display: { sm: 'flex', xs: 'none' },
            }}
          >
            неработа.
            <Typography
              variant="h4"
              component="p"
              sx={{
                fontWeight: 600,
              }}
              color="primary"
            >
              встречи
            </Typography>
          </Typography>
        </Box>

        <ThemeModeSwitch
          sx={{ m: 1 }}
          onChange={toggleColorMode}
          checked={mode === 'dark'}
        />

        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountCircle fontSize="large" color="primary" sx={{ mr: 1 }} />
            <Typography variant="body1">Дмитрий</Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
