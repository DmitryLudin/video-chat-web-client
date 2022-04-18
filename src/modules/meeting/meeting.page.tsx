import { Box } from '@mui/material';
import { MeetingContent } from 'modules/meeting/components/content/content';
import { MeetingFooter } from 'modules/meeting/components/footer/footer';
import { MeetingContentWrap } from 'modules/meeting/components/main-content-wrap';
import { MeetingSidebar } from 'modules/meeting/components/sidebar/sidebar';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';

export function MeetingPage() {
  const { id } = useParams() as { id: string };

  useEffect(() => {
    meetingService.connect(id);

    return () => {
      meetingService.leaveMeeting(id);
    };
  }, [id]);

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
