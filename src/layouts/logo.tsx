import { Videocam } from '@mui/icons-material';
import { Typography } from '@mui/material';
import React from 'react';

export function Logo() {
  return (
    <>
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
    </>
  );
}
