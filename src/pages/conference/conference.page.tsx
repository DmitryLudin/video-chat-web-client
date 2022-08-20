import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { ServerErrorCode } from 'core/base-transport';
import { ConferenceContent } from 'pages/conference/components/content/content';
import { ConferenceFooter } from 'pages/conference/components/footer/footer';
import { ConferenceContentWrap } from 'pages/conference/components/main-content-wrap';
import { ConferenceSidebar } from 'pages/conference/components/sidebar/sidebar';
import { NotJoinedModal } from 'pages/conference/modals';
import { ConferenceOverModal } from 'pages/conference/modals/conference-over-modal';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function ConferencePageObserver() {
  const { id } = useParams() as { id: string };
  const { room, isConferenceOver, isLoading, error } = conferenceService.store;
  const user = userService.store.user as IUser;

  useEffect(() => {
    void conferenceService.getByUserId(id, user.id).then((room) => {
      if (room) {
        conferenceService.connect();
      }
    });
  }, [id, user.id]);

  useEffect(() => {
    return () => {
      conferenceService.disconnect();
      conferenceService.resetStore();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {isLoading && (
        <Grid sx={{ p: 3 }} container justifyContent="center">
          <CircularProgress />
        </Grid>
      )}

      {!room && error?.code === ServerErrorCode.MEETING_NOT_FOUND && (
        <Grid sx={{ p: 3 }} container justifyContent="center">
          <Typography variant="h5" color="error">
            Видимо такой конференции нет
          </Typography>
        </Grid>
      )}

      {!isLoading && !isConferenceOver && room && (
        <>
          <ConferenceContentWrap>
            <ConferenceContent />
            <ConferenceFooter />
          </ConferenceContentWrap>
          <ConferenceSidebar />
        </>
      )}

      <NotJoinedModal />
      <ConferenceOverModal />
    </Box>
  );
}

export const ConferencePage = withObserverMemo(ConferencePageObserver);
