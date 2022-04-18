import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Button, TextField } from '@mui/material';
import { Modal } from 'components/modal';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'shared/hooks/use-modal.hook';
import { HomePageCard } from 'modules/home/components/card';
import React, { useCallback, useState } from 'react';

export function JoinToMeetingCard() {
  const [isOpen, handleOpen, handleClose] = useModal();
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState('');

  const handleSubmit = useCallback(() => {
    navigate(`meeting/${meetingId}`);
    handleClose();
  }, [handleClose, meetingId, navigate]);

  const handleChangeMeetingId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMeetingId(event.target.value);
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
        onClose={handleClose}
        buttons={
          <>
            <Button color="inherit" variant="contained" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Войти
            </Button>
          </>
        }
      >
        <TextField
          autoFocus
          margin="dense"
          label="ID встречи"
          type="text"
          fullWidth
          onChange={handleChangeMeetingId}
          variant="outlined"
        />
      </Modal>
    </>
  );
}
