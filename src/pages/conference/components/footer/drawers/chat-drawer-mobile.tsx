import { SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import { Chat } from 'pages/conference/components/sidebar/chat/chat';
import { uiSidebarService } from 'pages/conference/services/ui-sidebar.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function ChatDrawerMobileObserver() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isChatOpen } = uiSidebarService.store;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <SwipeableDrawer
      onClose={uiSidebarService.onToggleChat}
      onOpen={() => {
        console.log('open');
      }}
      anchor="bottom"
      open={isTableOrMobile && isChatOpen}
    >
      <Chat />
    </SwipeableDrawer>
  );
}

export const ChatDrawerMobile = withObserverMemo(ChatDrawerMobileObserver);
