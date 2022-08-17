import {
  Divider,
  Drawer,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { Chat } from 'modules/conference/components/sidebar/chat/chat';
import { Members } from 'modules/conference/components/sidebar/members';
import { drawerWidth } from 'modules/conference/consts';
import { uiSidebarService } from 'modules/conference/services/ui-sidebar.service';
import React from 'react';

function ConferenceSidebarObserver() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isMembersListOpen, isChatOpen } = uiSidebarService.store;

  if (isTableOrMobile) return null;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      open={!isTableOrMobile && uiSidebarService.isSidebarOpen}
      anchor="right"
    >
      <Toolbar />
      {isMembersListOpen && <Members />}
      {isMembersListOpen && isChatOpen && <Divider />}
      {isChatOpen && <Chat />}
    </Drawer>
  );
}

export const ConferenceSidebar = withObserverMemo(ConferenceSidebarObserver);
