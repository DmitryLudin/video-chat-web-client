import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ServerErrorCode } from 'core/base-transport';
import { MeetingContent } from 'modules/meeting/components/content/content';
import { MeetingFooter } from 'modules/meeting/components/footer/footer';
import { MeetingContentWrap } from 'modules/meeting/components/main-content-wrap';
import { MeetingSidebar } from 'modules/meeting/components/sidebar/sidebar';
import { MeetingOverModal, NotJoinedModal } from 'modules/meeting/modals';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function MeetingPageObserver() {
  const { id } = useParams() as { id: string };
  const { meeting, isMeetingOver, isLoading, error } = meetingService.store;
  const user = userService.store.user as IUser;

  useEffect(() => {
    void meetingService.getByUserId(id, user.id).then((meeting) => {
      if (meeting) {
        meetingService.connect();
      }
    });
  }, [id, user.id]);

  useEffect(() => {
    return () => {
      meetingService.disconnect();
      meetingService.resetStore();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoading && (
        <Grid sx={{ p: 3 }} container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {!meeting && error?.code === ServerErrorCode.MEETING_NOT_FOUND && (
        <Grid sx={{ p: 3 }} container justifyContent="center">
          <Typography variant="h5" color="error">
            Видимо такой встречи нет
          </Typography>
        </Grid>
      )}

      {!isLoading && !isMeetingOver && meeting && (
        <>
          <MeetingContentWrap>
            <MeetingContent />
            <MeetingFooter />
          </MeetingContentWrap>
          <MeetingSidebar />
        </>
      )}

      <NotJoinedModal />
      <MeetingOverModal />
    </Box>
  );
}

export const MeetingPage = withObserverMemo(MeetingPageObserver);
