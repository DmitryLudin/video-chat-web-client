import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ConferenceMainSpeaker } from 'pages/conference/components/content/main-speaker';
import { SmallSpeakersList } from 'pages/conference/components/content/small-speakers/small-speakers-list';
import React from 'react';

export function ConferenceContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        p: isMobile ? 2 : 4,
        margin: '0 auto',
        width: '100%',
        maxWidth: '1200px',
        height: `calc(100vh - 92px - ${isMobile ? 56 : 64}px)`,
        display: 'grid',
        gridTemplateRows: '70% 30%',
        gridGap: (theme) => theme.spacing(2),
      }}
    >
      <ConferenceMainSpeaker />
      <SmallSpeakersList />
    </Box>
  );
}
