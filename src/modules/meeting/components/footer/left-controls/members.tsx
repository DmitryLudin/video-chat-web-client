import PeopleIcon from '@mui/icons-material/People';
import { Badge } from '@mui/material';
import { FooterActionControl } from 'modules/meeting/components/footer/components';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';
import { uiSidebarService } from 'modules/meeting/services/ui-sidebar.service';
import React from 'react';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

function FooterMembersControlObserver() {
  const { isMembersListOpen } = uiSidebarService.store;
  const { members } = meetingService.store;

  return (
    <FooterActionControl
      onClick={uiSidebarService.onToggleMembers}
      icon={
        <Badge
          invisible={isMembersListOpen}
          badgeContent={members.length}
          color="secondary"
        >
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
