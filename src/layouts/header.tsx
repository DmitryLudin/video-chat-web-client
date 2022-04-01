import { Videocam } from '@mui/icons-material';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import React from 'react';

const user = true;

export function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Videocam fontSize="large" sx={{ mr: 2 }} />
        <Typography
          variant="h4"
          component="p"
          sx={{ fontWeight: 600, flexGrow: 1 }}
        >
          неработа.встречи
        </Typography>
        {user && (
          <Box sx={{ display: 'flex' }}>
            <AccountCircle sx={{ mr: 1 }} />
            <Typography>Дмитрий</Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
