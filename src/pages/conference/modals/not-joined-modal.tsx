import { ServerErrorCode } from 'core/base-transport';
import { JoinConferenceModal } from 'modules/join-conference-modal/join-conference-modal';
import { TJoinConferenceFormData } from 'modules/join-conference-modal/types';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';

function NotJoinedModalObserver() {
  const navigate = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal();
  const { isLoading, error } = conferenceService.roomStore;
  const user = userService.store.user as IUser;

  useEffect(() => {
    if (error?.code === ServerErrorCode.USER_NOT_MEMBER) {
      handleOpen();
    }
  }, [error?.code, handleOpen]);

  const handleSubmit = useCallback(
    ({ roomId, displayName }: TJoinConferenceFormData) => {
      void conferenceService
        .joinRoom(roomId, { userId: user.id, displayName })
        .then((room) => {
          if (room) {
            conferenceService.connect();
            handleClose();
          }
        });
    },
    [handleClose, user.id]
  );

  const handleCloseModal = useCallback(() => {
    navigate('/');
    handleClose();
  }, [handleClose, navigate]);

  return (
    <JoinConferenceModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={handleCloseModal}
      onClick={handleSubmit}
    />
  );
}

export const NotJoinedModal = withObserverMemo(NotJoinedModalObserver);
