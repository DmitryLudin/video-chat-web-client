import { Close } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import React from 'react';

export function ReplyMessage({ onClose }: { onClose: () => void }) {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      wrap="nowrap"
    >
      <Box
        sx={{
          display: 'inline-grid',
          gridAutoFlow: 'column',
          py: 1,
          gap: '8px',
          alignItems: 'center',
        }}
      >
        <ReplyIcon color="primary" />
        <Divider variant="middle" orientation="vertical" />
        <Box
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <Typography variant="subtitle1">Remy Sharp</Typography>
          <Typography color="text.secondary" variant="subtitle2" noWrap>
            Ill be in your neighborhood doing errands this
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Grid>
  );
}
