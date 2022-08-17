import { Box, CircularProgress, Grid } from '@mui/material';
import { AppBarMenu } from 'modules/app-bar/app-bar';
import React, { useEffect, useState } from 'react';
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
      <AppBarMenu />
      <Box sx={{ pt: 6, pb: 4, bgcolor: 'background.default' }}>
        {isLoading ? (
          <Grid sx={{ p: 3 }} container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <Outlet />
        )}
      </Box>
    </Box>
  );
}
