import { useMediaQuery, useTheme } from '@mui/material';
import { Wrap } from 'modules/conference/components/main-content-wrap.styles';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { uiSidebarService } from 'modules/conference/services/ui-sidebar.service';
import React, { PropsWithChildren, useEffect } from 'react';

export const ConferenceContentWrap = withObserverMemo(
  function ConferenceContentWrapObserver({
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
        isSidebarOpen={isTableOrMobile || uiSidebarService.isSidebarOpen}
      >
        {children}
      </Wrap>
    );
  }
);
