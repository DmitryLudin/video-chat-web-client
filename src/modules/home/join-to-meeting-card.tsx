import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { JoinMeetingModal } from 'components/join-meeting-modal/join-meeting-modal';
import { TJoinMeetingFormData } from 'components/join-meeting-modal/types';
import { useNavigate } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';
import { HomePageCard } from 'modules/home/components/card';
import React, { useCallback } from 'react';

function JoinToMeetingCardObserver() {
  const navigate = useNavigate();
  const user = userService.store.user as IUser;
  const isLoading = meetingService.store.isLoading;
  const [isOpen, handleOpen, handleClose] = useModal();

  const handleSubmit = useCallback(
    ({ meetingId, displayName }: TJoinMeetingFormData) => {
      void meetingService
        .join(meetingId, { userId: user.id, displayName })
        .then((meeting) => {
          if (meeting) {
            navigate(`meeting/${meetingId}`);
            handleClose();
          }
        });
    },
    [handleClose, navigate, user.id]
  );

  return (
    <>
      <HomePageCard
        title="Присоединиться"
        subtitle="по приглашающей ссылке"
        cardColor="primary.main"
        onClick={handleOpen}
        icon={
          <AddCircleRoundedIcon
            sx={{ color: 'primary.contrastText' }}
            fontSize="large"
          />
        }
      />

      <JoinMeetingModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={handleClose}
        onClick={handleSubmit}
      />
    </>
  );
}

export const JoinToMeetingCard = withObserverMemo(JoinToMeetingCardObserver);
