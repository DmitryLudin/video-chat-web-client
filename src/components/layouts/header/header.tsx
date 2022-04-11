import { AppBar, Box, Toolbar } from '@mui/material';
import { ThemeSwitch } from 'components/layouts/header/theme-switch';
import { UserAccount } from 'components/layouts/header/user-account';
import { Logo } from 'components/layouts/logo';
import React from 'react';

export function Header() {
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
