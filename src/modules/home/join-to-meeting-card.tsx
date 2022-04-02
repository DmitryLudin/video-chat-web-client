import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { Button, TextField } from '@mui/material';
import { Modal } from 'components/modal';
import { useModalHook } from 'hooks/use-modal.hook';
import { HomePageCard } from 'modules/home/components/card';
import React from 'react';

export function JoinToMeetingCard() {
  const [isOpen, handleOpen, handleClose] = useModalHook();

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
            <Button variant="outlined" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Войти
            </Button>
          </>
        }
      >
        <>
          <TextField
            autoFocus
            margin="dense"
            label="ID встречи"
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            label="Твое имя"
            type="text"
            fullWidth
            variant="outlined"
          />
        </>
      </Modal>
    </>
  );
}
