import { Close } from '@mui/icons-material';
import ReplyIcon from '@mui/icons-material/Reply';
import { Box, Divider, Grid, IconButton, Typography } from '@mui/material';
import { uiChatService } from 'modules/meeting/services/ui-chat.service';
import React from 'react';
import { IMessage } from 'shared/domains/meeting/models';

type TProps = {
  message: IMessage;
};

export function ReplyFooterMessage({ message }: TProps) {
  const { author, text } = message;

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
          <Typography variant="subtitle1">
            {author.displayName ||
              author.user.displayName ||
              author.user.username}
          </Typography>
          <Typography color="text.secondary" variant="subtitle2" noWrap>
            {text}
          </Typography>
        </Box>
      </Box>
      <IconButton onClick={uiChatService.resetStore}>
        <Close />
      </IconButton>
    </Grid>
  );
}
