import { SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import { withObserverMemo } from 'hoc/with-observer-memo.hoc';
import { Members } from 'modules/meeting/components/sidebar/members';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React from 'react';

function MembersDrawerMobileObserver() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isMembersListOpen, isChatOpen } = uiSidebarService.store;

  return (
    <SwipeableDrawer
      sx={{
        [`& .MuiDrawer-paper`]: {
          maxHeight: '50%',
          boxSizing: 'border-box',
        },
      }}
      onClose={uiSidebarService.onToggleMembers}
      onOpen={() => {
        console.log('open');
      }}
      anchor="bottom"
      open={isTableOrMobile && isMembersListOpen}
    >
      <Members />
    </SwipeableDrawer>
  );
}

export const MembersDrawerMobile = withObserverMemo(
  MembersDrawerMobileObserver
);
