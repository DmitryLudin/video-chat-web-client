import { Button, DialogContentText } from '@mui/material';
import { Modal } from 'components/modal';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IMeeting } from 'shared/domains/meeting/models';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';

function EndMeetingControlObserver() {
  const navigate = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal();
  const user = userService.store.user as IUser;
  const meeting = meetingService.store.meeting as IMeeting;

  const isUserOwner = user.id === meeting.owner.id;

  const handleClick = useCallback(() => {
    if (isUserOwner) {
      handleOpen();
      return;
    }

    navigate('/');
  }, [handleOpen, isUserOwner, navigate]);

  const handleEndMeeting = useCallback(() => {
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
        title="Завершить встречу?"
        isOpen={isOpen}
        buttons={
          <Button
            color="primary"
            variant="contained"
            onClick={handleEndMeeting}
          >
            Завершить
          </Button>
        }
      >
        <DialogContentText>
          Встреча завершится для всех участников
        </DialogContentText>
      </Modal>
    </>
  );
}

export const EndMeetingControl = withObserverMemo(EndMeetingControlObserver);
