import { Box, useMediaQuery, useTheme } from '@mui/material';
import { MeetingContent } from 'modules/meeting/components/content';
import { MeetingFooter } from 'modules/meeting/components/footer/footer';
import { MeetingSidebar } from 'modules/meeting/components/sidebar';
import React from 'react';

export function MeetingPage() {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: `calc(100vh - ${isSmallDevice ? '56px' : '64px'})`,
        }}
      >
        <MeetingContent />
        <MeetingFooter />
      </Box>
      <MeetingSidebar />
    </Box>
  );
}
