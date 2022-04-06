import { styled, useMediaQuery, useTheme } from '@mui/material';
import { withObserverMemo } from 'hoc/with-observer-memo.hoc';
import { drawerWidth } from 'modules/meeting/consts';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React, { PropsWithChildren, useEffect } from 'react';

const Wrap = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  isSidebarOpen?: boolean;
  isMobile: boolean;
}>(({ theme, isMobile, isSidebarOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  minHeight: `calc(100vh - ${isMobile ? 56 : 64}px)`,
  marginRight: -drawerWidth,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  ...((isSidebarOpen || isMobile) && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

export const MeetingContentWrap = withObserverMemo(
  function MeetingContentWrapObserver({
    children,
  }: PropsWithChildren<Record<string, unknown>>) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTableOrMobile = useMediaQuery(theme.breakpoints.down('md'));

    useEffect(() => {
      uiSidebarService.onSetSidebarOpen(!isTableOrMobile);
    }, [isTableOrMobile]);

    return (
      <Wrap
        isMobile={isMobile}
        isSidebarOpen={uiSidebarService.isSidebarOpen || isTableOrMobile}
      >
        {children}
      </Wrap>
    );
  }
);
