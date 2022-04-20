import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField } from '@mui/material';
import { Modal } from 'components/modal';
import { useNavigate } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';
import { HomePageCard } from 'modules/home/components/card';
import React, { useCallback, useState } from 'react';

export function JoinToMeetingCardObserver() {
  const navigate = useNavigate();
  const user = userService.store.user as IUser;
  const isLoading = meetingService.store.isLoading;

  const [isOpen, handleOpen, handleClose] = useModal();
  const [meetingId, setMeetingId] = useState('');
  const name = user.displayName || user.username;
  const [displayName, setDisplayName] = useState(name);

  const handleCloseModal = useCallback(() => {
    setMeetingId('');
    setDisplayName(name);
    handleClose();
  }, [handleClose, name]);

  const handleSubmit = useCallback(() => {
    void meetingService
      .joinMeeting(meetingId, { userId: user.id, displayName })
      .then((meeting) => {
        if (meeting) {
          navigate(`meeting/${meetingId}`);
          handleCloseModal();
        }
      });
  }, [displayName, handleCloseModal, meetingId, navigate, user.id]);

  const handleChangeMeetingId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMeetingId(event.target.value);
    },
    []
  );

  const handleChangeDisplayName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDisplayName(event.target.value);
    },
    []
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

      <Modal
        title="Присоединиться к встрече"
        isOpen={isOpen}
        onClose={handleCloseModal}
        buttons={
          <>
            <Button
              color="inherit"
              variant="contained"
              onClick={handleCloseModal}
            >
              Отменить
            </Button>
            <LoadingButton
              onClick={handleSubmit}
              loading={isLoading}
              variant="contained"
            >
              Войти
            </LoadingButton>
          </>
        }
      >
        <TextField
          autoFocus
          margin="dense"
          label="ID встречи"
          type="text"
          fullWidth
          value={meetingId}
          onChange={handleChangeMeetingId}
          variant="outlined"
        />
        <TextField
          margin="dense"
          label="Твое имя"
          type="text"
          fullWidth
          value={displayName}
          onChange={handleChangeDisplayName}
          variant="outlined"
        />
      </Modal>
    </>
  );
}

export const JoinToMeetingCard = withObserverMemo(JoinToMeetingCardObserver);
