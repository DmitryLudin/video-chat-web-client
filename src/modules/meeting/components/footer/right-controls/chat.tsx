import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { FooterActionControl } from 'modules/meeting/components/footer/action-control';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React from 'react';

function FooterChatControlObserver() {
  const { isChatOpen } = uiSidebarService.store;

  return (
    <FooterActionControl
      color="secondary"
      onClick={uiSidebarService.onToggleChat}
      icon={
        <Badge invisible={isChatOpen} badgeContent={200} color="primary">
          {isChatOpen ? (
            <MarkChatReadIcon sx={{ fontSize: '30px' }} />
          ) : (
            <ChatIcon sx={{ fontSize: '30px' }} />
          )}
        </Badge>
      }
    />
  );
}

export const FooterChatControl = withObserverMemo(FooterChatControlObserver);
