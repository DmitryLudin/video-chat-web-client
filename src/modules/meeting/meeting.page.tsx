import { Box } from '@mui/material';
import { MeetingContent } from 'modules/meeting/components/content';
import { MeetingFooter } from 'modules/meeting/components/footer';
import { MeetingSidebar } from 'modules/meeting/components/sidebar';
import React from 'react';

export function MeetingPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          minHeight: 'calc(100vh - 64px)',
        }}
      >
        <MeetingContent />
        <MeetingFooter />
      </Box>
      <MeetingSidebar />
    </Box>
  );
}
