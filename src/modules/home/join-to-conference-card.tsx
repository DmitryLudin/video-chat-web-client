import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { JoinConferenceModal } from 'components/join-conference-modal/join-conference-modal';
import { TJoinConferenceFormData } from 'components/join-conference-modal/types';
import { useNavigate } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';
import { HomePageCard } from 'modules/home/components/card';
import React, { useCallback } from 'react';

function JoinToConferenceCardObserver() {
  const navigate = useNavigate();
  const user = userService.store.user as IUser;
  const isLoading = conferenceService.store.isLoading;
  const [isOpen, handleOpen, handleClose] = useModal();

  const handleSubmit = useCallback(
    ({ roomId, displayName }: TJoinConferenceFormData) => {
      void conferenceService
        .join(roomId, { userId: user.id, displayName })
        .then((meeting) => {
          if (meeting) {
            navigate(`conference/${roomId}`);
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

      <JoinConferenceModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={handleClose}
        onClick={handleSubmit}
      />
    </>
  );
}

export const JoinToConferenceCard = withObserverMemo(
  JoinToConferenceCardObserver
);
