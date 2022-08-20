import {
  Divider,
  Drawer,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Chat } from 'pages/conference/components/sidebar/chat/chat';
import { Members } from 'pages/conference/components/sidebar/members';
import { drawerWidth } from 'pages/conference/consts';
import { uiSidebarService } from 'pages/conference/services/ui-sidebar.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
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
