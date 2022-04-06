import { SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import { withObserverMemo } from 'hoc/with-observer-memo.hoc';
import { Chat } from 'modules/meeting/components/sidebar/chat/chat';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React from 'react';

function ChatDrawerMobileObserver() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isMembersListOpen, isChatOpen } = uiSidebarService.store;

  return (
    <SwipeableDrawer
      onClose={uiSidebarService.onToggleChat}
      onOpen={() => {
        console.log('open');
      }}
      anchor="bottom"
      open={isTableOrMobile && isChatOpen}
    >
      <Chat isMembersListOpen={isMembersListOpen} />
    </SwipeableDrawer>
  );
}

export const ChatDrawerMobile = withObserverMemo(ChatDrawerMobileObserver);
