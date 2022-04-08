import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { MeetingMainSpeaker } from 'modules/meeting/components/content/main-speaker';
import { MeetingSmallSpeaker } from 'modules/meeting/components/content/small-speaker';
import React from 'react';

export function MeetingContent() {
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
      <MeetingMainSpeaker />

      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ overflow: 'auto' }}>
          <Stack spacing={2} direction="row">
            <MeetingSmallSpeaker />
            <MeetingSmallSpeaker />
            <MeetingSmallSpeaker />
            <MeetingSmallSpeaker />
            <MeetingSmallSpeaker />
            <MeetingSmallSpeaker />
            <MeetingSmallSpeaker />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
