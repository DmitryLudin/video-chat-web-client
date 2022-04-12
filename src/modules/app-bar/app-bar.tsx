import { AppBar, Box, Toolbar } from '@mui/material';
import { ThemeSwitch } from 'modules/app-bar/theme-switch';
import { UserAccount } from 'modules/app-bar/user-account';
import { Logo } from 'components/logo';
import React from 'react';

export function AppBarMenu() {
  return (
    <AppBar
      position="relative"
      color="inherit"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Logo />
        </Box>

        <ThemeSwitch />
        <UserAccount />
      </Toolbar>
    </AppBar>
  );
}
