import VideoCameraFrontRoundedIcon from '@mui/icons-material/VideoCameraFrontRounded';
import { HomePageCard } from 'modules/home/components/card';
import React, { MouseEventHandler, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export function HomeCreateMeetingCard() {
  const navigate = useNavigate();

  const handleNavigateToMeeting: MouseEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        e.preventDefault();
        const id = uuidv4();
        navigate(`meeting/${id}`);
      },
      [navigate]
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
