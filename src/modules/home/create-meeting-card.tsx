import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import { HomePageCard } from 'modules/home/components/card';
import React, { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function HomeCreateMeetingCardObserver() {
  const navigate = useNavigate();
  const user = userService.store.user as IUser;

  const handleNavigateToMeeting: MouseEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        void meetingService.create({ ownerId: user.id }).then((meeting) => {
          if (meeting) {
            navigate(`meeting/${meeting.id}`);
          }
        });
      },
      [navigate, user.id]
    );

  return (
    <HomePageCard
      title="Новая встреча"
      subtitle="Запустить новую встречу"
      cardColor="secondary.main"
      onClick={handleNavigateToMeeting}
      icon={
        <VideoCameraFrontRoundedIcon
          sx={{ color: 'primary.contrastText' }}
          fontSize="large"
        />
      }
    />
  );
}

export const HomeCreateMeetingCard = withObserverMemo(
  HomeCreateMeetingCardObserver
);
