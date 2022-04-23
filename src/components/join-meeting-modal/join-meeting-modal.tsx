import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField } from '@mui/material';
import { TJoinMeetingFormData } from 'components/join-meeting-modal/types';
import { Modal } from 'components/modal';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClick: (data: TJoinMeetingFormData) => void;
  onClose: VoidFunction;
};

function JoinMeetingModalObserver({
  isOpen,
  onClose,
  onClick,
  isLoading,
}: TProps) {
  const { id } = useParams() as { id: string };
  const [meetingId, setMeetingId] = useState(id || '');
  const user = userService.store.user as IUser;
  const name = user.displayName || user.username;
  const [displayName, setDisplayName] = useState(name);

  const handleCloseModal = useCallback(() => {
    setMeetingId(id || '');
    setDisplayName(name);
    onClose();
  }, [onClose, name]);

  const handleSubmit = useCallback(() => {
    onClick({ meetingId, displayName });
  }, [displayName, meetingId, onClick]);

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
  );
}

export const JoinMeetingModal = withObserverMemo(JoinMeetingModalObserver);
