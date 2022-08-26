import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { FooterActionControl } from 'pages/conference/components/footer/components';
import { uiSidebarService } from 'pages/conference/services/ui-sidebar.service';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function FooterChatControlObserver() {
  const { isChatOpen } = uiSidebarService.store;
  const messages = conferenceService.chatStore.messages;

  return (
    <FooterActionControl
      color="secondary"
      onClick={uiSidebarService.onToggleChat}
      icon={
        <Badge
          invisible={isChatOpen}
          badgeContent={messages.length}
          color="primary"
        >
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
