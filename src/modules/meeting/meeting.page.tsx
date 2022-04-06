import { Box } from '@mui/material';
import { MeetingContent } from 'modules/meeting/components/content';
import { MeetingFooter } from 'modules/meeting/components/footer/footer';
import { MeetingContentWrap } from 'modules/meeting/components/main-content-wrap';
import { MeetingSidebar } from 'modules/meeting/components/sidebar/sidebar';
import React from 'react';

export function MeetingPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <MeetingContentWrap>
        <MeetingContent />
        <MeetingFooter />
      </MeetingContentWrap>
      <MeetingSidebar />
    </Box>
  );
}
