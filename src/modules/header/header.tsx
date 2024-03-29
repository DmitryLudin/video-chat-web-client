import { AppBar, Box, Toolbar } from '@mui/material';
import { ThemeSwitch } from 'modules/header/theme-switch';
import { UserAccount } from 'modules/header/user-account';
import { Logo } from 'components/logo';

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
