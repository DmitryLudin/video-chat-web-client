import { JoinMeetingModal } from 'components/join-meeting-modal/join-meeting-modal';
import { TJoinMeetingFormData } from 'components/join-meeting-modal/types';
import { ServerErrorCode } from 'core/base-transport';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { useModal } from 'shared/hooks/use-modal.hook';

function NotJoinedModalObserver() {
  const navigate = useNavigate();
  const [isOpen, handleOpen, handleClose] = useModal();
  const { isLoading, error } = meetingService.store;
  const user = userService.store.user as IUser;

  useEffect(() => {
    if (error?.code === ServerErrorCode.USER_NOT_MEMBER) {
      handleOpen();
    }
  }, [error?.code, handleOpen]);

  const handleSubmit = useCallback(
    ({ meetingId, displayName }: TJoinMeetingFormData) => {
      void meetingService
        .join(meetingId, { userId: user.id, displayName })
        .then((meeting) => {
          if (meeting) {
            meetingService.connect();
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
    <JoinMeetingModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={handleCloseModal}
      onClick={handleSubmit}
    />
  );
}

export const NotJoinedModal = withObserverMemo(NotJoinedModalObserver);
