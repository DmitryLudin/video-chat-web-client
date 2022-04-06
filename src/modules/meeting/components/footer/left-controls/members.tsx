import PeopleIcon from '@mui/icons-material/People';
import { Badge } from '@mui/material';
import { withObserverMemo } from 'hoc/with-observer-memo.hoc';
import { FooterActionControl } from 'modules/meeting/components/footer/action-control';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React from 'react';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

function FooterMembersControlObserver() {
  const { isMembersListOpen } = uiSidebarService.store;

  return (
    <FooterActionControl
      onClick={uiSidebarService.onToggleMembers}
      icon={
        <Badge invisible={isMembersListOpen} badgeContent={4} color="secondary">
          {isMembersListOpen ? (
            <PeopleOutlineIcon sx={{ fontSize: '30px' }} />
          ) : (
            <PeopleIcon sx={{ fontSize: '30px' }} />
          )}
        </Badge>
      }
    />
  );
}

export const FooterMembersControl = withObserverMemo(
  FooterMembersControlObserver
);
