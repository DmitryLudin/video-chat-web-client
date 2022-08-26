import { Box } from '@mui/material';
import { Loader } from 'components/loader';
import { Header } from 'modules/header/header';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';

export function Layout() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authService.authenticate().finally(() => setLoading(false));
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <Box sx={{ bgcolor: 'background.default' }}>
        {isLoading ? <Loader /> : <Outlet />}
      </Box>
    </Box>
  );
}
