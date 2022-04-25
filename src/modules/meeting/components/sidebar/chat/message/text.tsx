import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Divider, Paper, Typography } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { IMessage } from 'shared/domains/meeting/models';

type TProps = {
  reply: IMessage;
};

export function MessageText({ children, reply }: PropsWithChildren<TProps>) {
  return (
    <Paper
      sx={{
        p: 1,
        px: 1.5,
        mr: 1,
        borderRadius: 3,
        hyphens: 'auto',
        bgcolor: (theme) => theme.palette.background.default,
      }}
      elevation={2}
    >
      {reply && (
        <Box
          sx={{
            display: 'grid',
            gridAutoFlow: 'column',
            mb: 1,
            gap: '8px',
            alignItems: 'center',
          }}
        >
          <ReplyIcon fontSize="small" color="primary" />
          <Divider variant="middle" orientation="vertical" />
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <Typography color="primary" fontSize="12px" variant="body2">
              {reply.author.displayName || reply.author.username}
            </Typography>
            <Typography
              color="text.secondary"
              fontSize="12px"
              variant="caption"
              noWrap
            >
              {reply.text}
            </Typography>
          </Box>
        </Box>
      )}
      {children}
    </Paper>
  );
}
