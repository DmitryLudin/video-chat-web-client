import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField } from '@mui/material';
import { Modal } from 'components/modal';
import { TJoinConferenceFormData } from 'modules/join-conference-modal/types';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  isOpen: boolean;
  isLoading?: boolean;
  onClick: (data: TJoinConferenceFormData) => void;
  onClose: VoidFunction;
};

function JoinConferenceModalObserver({
  isOpen,
  onClose,
  onClick,
  isLoading,
}: TProps) {
  const { id } = useParams() as { id: string };
  const [roomId, setRoomId] = useState(id || '');
  const user = userService.store.user as IUser;
  const name = user.displayName || user.username;
  const [displayName, setDisplayName] = useState(name);

  const handleCloseModal = useCallback(() => {
    setRoomId(id || '');
    setDisplayName(name);
    onClose();
  }, [id, name, onClose]);

  const handleSubmit = useCallback(() => {
    onClick({ roomId: roomId, displayName });
  }, [displayName, roomId, onClick]);

  const handleChangeRoomId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRoomId(event.target.value);
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
      title="Присоединиться к конференции"
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
        label="ID конференции"
        type="text"
        fullWidth
        value={roomId}
        onChange={handleChangeRoomId}
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

export const JoinConferenceModal = withObserverMemo(
  JoinConferenceModalObserver
);
