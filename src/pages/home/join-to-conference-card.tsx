import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { JoinConferenceModal } from 'modules/join-conference-modal/join-conference-modal';
import { TJoinConferenceFormData } from 'modules/join-conference-modal/types';
import { HomePageCard } from 'pages/home/components/card';
import { useNavigate } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';
import { useCallback } from 'react';

function JoinToConferenceCardObserver() {
  const navigate = useNavigate();
  const user = userService.store.user as IUser;
  const isLoading = conferenceService.roomStore.isLoading;
  const [isOpen, handleOpen, handleClose] = useModal();

  const handleSubmit = useCallback(
    ({ roomId, displayName }: TJoinConferenceFormData) => {
      void conferenceService
        .joinRoom(roomId, { userId: user.id, displayName })
        .then((room) => {
          if (room) {
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
