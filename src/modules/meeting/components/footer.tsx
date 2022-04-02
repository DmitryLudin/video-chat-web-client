import { Paper } from '@mui/material';
import React from 'react';

const footerHeight = 92;

export function MeetingFooter() {
  return (
    <Paper
      sx={{
        height: footerHeight,
        borderRadius: 0,
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        py: 3,
        px: 2,
        mt: 'auto',
        boxSizing: 'border-box',
      }}
      component="footer"
    >
      Footer
    </Paper>
  );
}
