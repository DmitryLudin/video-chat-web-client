import { Box, Paper, Typography } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import React from 'react';

type TProps = {
  width?: string;
};

export function Video({ width = '100%' }: TProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        width,
        minWidth: '30vh',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <img
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="https://www.business.com/images/content/5f2/872bf7b437456608b4567/1500-0-"
      />
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Paper
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 2,
            bgcolor: 'rgba(24, 24, 26, 0.85)',
          }}
        >
          <Typography color="#fff" variant="subtitle2">
            Лудин Дмитрий
          </Typography>
        </Paper>
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 1,
            py: 0.5,
            borderRadius: 2,
            bgcolor: 'rgba(117, 88, 224, 0.85)',
          }}
        >
          <MicIcon sx={{ color: '#fff' }} />
        </Paper>
      </Box>
    </Paper>
  );
}
