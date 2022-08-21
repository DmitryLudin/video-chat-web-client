import { Button, DialogContentText } from '@mui/material';
import { Modal } from 'components/modal';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRoom } from 'shared/domains/conference/models';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';

function EndConferenceControlObserver() {
  const navigate = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal();
  const user = userService.store.user as IUser;
  const room = conferenceService.roomStore.room as IRoom;

  const isUserOwner = user.id === room.owner.id;

  const handleClick = useCallback(() => {
    if (isUserOwner) {
      handleOpen();
      return;
    }

    navigate('/');
  }, [handleOpen, isUserOwner, navigate]);

  const handleEndConference = useCallback(() => {
    navigate('/');
    handleClose();
  }, [handleClose, navigate]);

  return (
    <>
      <Button
        onClick={handleClick}
        sx={{ borderRadius: 3, p: 2 }}
        variant="contained"
        color="error"
      >
        {isUserOwner ? 'Завершить' : 'Покинуть'}
      </Button>

      <Modal
        title="Завершить конференцию?"
        isOpen={isOpen}
        onClose={handleClose}
        buttons={
          <Button
            color="primary"
            variant="contained"
            onClick={handleEndConference}
          >
            Завершить
          </Button>
        }
      >
        <DialogContentText>
          Конференция завершится для всех участников
        </DialogContentText>
      </Modal>
    </>
  );
}

export const EndConferenceControl = withObserverMemo(
  EndConferenceControlObserver
);
