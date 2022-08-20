import {
  Box,
  List,
  ListSubheader,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ChatFooter } from 'pages/conference/components/sidebar/chat/footer';
import { Message } from 'pages/conference/components/sidebar/chat/message/message';
import React from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function ChatObserver() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const messages = conferenceService.store.messages;

  return (
    <Box
      sx={{
        display: 'grid',
        flexDirection: 'column',
        flex: 2,
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
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];

            return (
              <Message
                key={message.id}
                message={message}
                isHideDetails={prevMessage?.author?.id === message.author.id}
              />
            );
          })}
        </List>
      </Box>
      <ChatFooter />
    </Box>
  );
}

export const Chat = withObserverMemo(ChatObserver);
