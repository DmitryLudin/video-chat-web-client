import { Box, Grid, Typography } from '@mui/material';
import { Loader } from 'components/loader';
import { ServerErrorCode } from 'core/base-transport';
import { ConferenceMediaContent } from 'pages/conference/components/media-content/content';
import { ConferenceFooter } from 'pages/conference/components/footer/footer';
import { ConferenceContentWrap } from 'pages/conference/components/main-content-wrap';
import { ConferenceSidebar } from 'pages/conference/components/sidebar/sidebar';
import { NotJoinedModal } from 'pages/conference/modals';
import { ConferenceOverModal } from 'pages/conference/modals/conference-over-modal';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function ConferencePageObserver() {
  const { id } = useParams() as { id: string };
  const { room, isRoomClosed, error } = conferenceService.roomStore;
  const isInitialized = conferenceService.isInitialized;
  const user = userService.store.user as IUser;

  useEffect(() => {
    void conferenceService.getRoomByUserId(id, user.id).then((room) => {
      if (room) {
        conferenceService.connect();
      }
    });
  }, [id, user.id]);

  useEffect(() => {
    return () => {
      conferenceService.disconnect();
      conferenceService.reset();
    };
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      {!isInitialized && <Loader />}

      {!room && error?.code === ServerErrorCode.ROOM_NOT_FOUND && (
        <Grid sx={{ p: 3 }} container justifyContent="center">
          <Typography variant="h5" color="error">
            Видимо такой конференции нет
          </Typography>
        </Grid>
      )}

      {isInitialized && !isRoomClosed && room && (
        <>
          <ConferenceContentWrap>
            <ConferenceMediaContent />
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
