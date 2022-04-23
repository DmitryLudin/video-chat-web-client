import { Button, DialogContentText } from '@mui/material';
import { Modal } from 'components/modal';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';

function MeetingOverModalObserver() {
  const navigate = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal();
  const { isMeetingOver } = meetingService.store;

  useEffect(() => {
    if (isMeetingOver) {
      handleOpen();
    }
  }, [handleOpen, isMeetingOver]);

  const handleCloseModal = useCallback(() => {
    navigate('/');
    handleClose();
  }, [navigate]);

  return (
    <Modal
      title="Встреча завершена"
      isOpen={isOpen}
      buttons={
        <Button color="primary" variant="contained" onClick={handleCloseModal}>
          Вернуться на главную
        </Button>
      }
    >
      <DialogContentText>
        Администратор завершил или покинул встречу
      </DialogContentText>
    </Modal>
  );
}

export const MeetingOverModal = withObserverMemo(MeetingOverModalObserver);
