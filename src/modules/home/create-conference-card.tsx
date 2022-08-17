import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import { HomePageCard } from 'modules/home/components/card';
import React, { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IUser } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function CreateConferenceCardObserver() {
  const navigate = useNavigate();
  const user = userService.store.user as IUser;

  const handleNavigateToConference: MouseEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        void conferenceService.create({ ownerId: user.id }).then((room) => {
          if (room) {
            navigate(`conference/${room.id}`);
          }
        });
      },
      [navigate, user.id]
    );

  return (
    <HomePageCard
      title="Новая конференция"
      subtitle="Запустить новую конференцию"
      cardColor="secondary.main"
      onClick={handleNavigateToConference}
      icon={
        <VideoCameraFrontRoundedIcon
          sx={{ color: 'primary.contrastText' }}
          fontSize="large"
        />
      }
    />
  );
}

export const CreateConferenceCard = withObserverMemo(
  CreateConferenceCardObserver
);
