import { SwipeableDrawer, useMediaQuery, useTheme } from '@mui/material';
import { uiSidebarService } from 'pages/conference/services/ui-sidebar.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

import { Members } from '../../sidebar/members';

function MembersDrawerMobileObserver() {
  const theme = useTheme();
  const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isMembersListOpen } = uiSidebarService.store;

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
