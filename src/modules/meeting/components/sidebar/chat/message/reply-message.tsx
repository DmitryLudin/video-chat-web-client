import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { IMessage } from 'shared/domains/meeting/models';

type TProps = {
  message: IMessage;
};

export function ReplyMessage({ message }: TProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridAutoColumns: 'max-content',
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
          {message.author.displayName ||
            message.author.user.displayName ||
            message.author.user.username}
        </Typography>
        <Typography
          color="text.secondary"
          fontSize="12px"
          variant="caption"
          noWrap
        >
          {message.text}
        </Typography>
      </Box>
    </Box>
  );
}
