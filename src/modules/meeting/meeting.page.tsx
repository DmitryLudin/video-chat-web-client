import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { MeetingContent } from 'modules/meeting/components/content/content';
import { MeetingFooter } from 'modules/meeting/components/footer/footer';
import { MeetingContentWrap } from 'modules/meeting/components/main-content-wrap';
import { MeetingSidebar } from 'modules/meeting/components/sidebar/sidebar';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function MeetingPageObserver() {
  const { id } = useParams() as { id: string };
  const { isLoading, error } = meetingService.store;
  const user = userService.store.user as IUser;

  useEffect(() => {
    void meetingService.getByUserId(id, user.id).then((meeting) => {
      if (meeting) {
        meetingService.connect();
        meetingService.sendJoinMeeting({
          meetingId: meeting.id,
          userId: user.id,
        });
      }
    });
  }, [id, user.id]);

  useEffect(() => {
    return () => {
      meetingService.disconnect();
      meetingService.resetStore();
    };
  }, []);

  if (error) {
    return (
      <Grid sx={{ p: 3 }} container justifyContent="center">
        <Typography variant="h5" color="error">
          Видимо такой встречи нет
        </Typography>
      </Grid>
    );
  }

  if (isLoading) {
    return (
      <Grid sx={{ p: 3 }} container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

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

export const MeetingPage = withObserverMemo(MeetingPageObserver);
