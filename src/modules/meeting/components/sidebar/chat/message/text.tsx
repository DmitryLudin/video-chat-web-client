import ReplyIcon from '@mui/icons-material/Reply';
import { Grid, IconButton, Paper } from '@mui/material';
import React, { PropsWithChildren } from 'react';

export function MessageText({ children }: PropsWithChildren<unknown>) {
  return (
    <Grid container wrap="nowrap" alignItems="center">
      <Paper
        sx={{
          p: 1,
          px: 1.5,
          borderRadius: 3,
          bgcolor: (theme) => theme.palette.background.default,
        }}
        elevation={2}
      >
        {children}
      </Paper>
      <IconButton edge="end">
        <ReplyIcon />
      </IconButton>
    </Grid>
  );
}
