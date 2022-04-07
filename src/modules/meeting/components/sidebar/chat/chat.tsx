import {
  Box,
  List,
  ListSubheader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChatFooter } from 'modules/meeting/components/sidebar/chat/footer';
import { Message } from 'modules/meeting/components/sidebar/chat/message/message';
import React from 'react';

export function Chat() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'grid',
        flexDirection: 'column',
        flexGrow: 1,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          overflow: 'auto',
          maxHeight: isTableOrMobile ? '60vh' : 'inherit',
          height: 'auto',
        }}
      >
        <List subheader={<ListSubheader>Чат</ListSubheader>}>
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </List>
      </Box>
      <ChatFooter />
    </Box>
  );
}
