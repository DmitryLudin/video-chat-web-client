import { Button, DialogContentText } from '@mui/material';
import { Modal } from 'components/modal';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';

function ConferenceOverModalObserver() {
  const navigate = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal();
  const { isRoomClosed } = conferenceService.roomStore;

  useEffect(() => {
    if (isRoomClosed) {
      handleOpen();
    }
  }, [handleOpen, isRoomClosed]);

  const handleCloseModal = useCallback(() => {
    navigate('/');
    handleClose();
  }, [handleClose, navigate]);

  return (
    <Modal
      title="Конференция завершена"
      isOpen={isOpen}
      buttons={
        <Button color="primary" variant="contained" onClick={handleCloseModal}>
          Вернуться на главную
        </Button>
      }
    >
      <DialogContentText>
        Администратор завершил или покинул конференцию
      </DialogContentText>
    </Modal>
  );
}

export const ConferenceOverModal = withObserverMemo(
  ConferenceOverModalObserver
);
