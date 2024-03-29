import PeopleIcon from '@mui/icons-material/People';
import { Badge } from '@mui/material';
import { FooterActionControl } from 'pages/conference/components/footer/components';
import { uiSidebarService } from 'pages/conference/services/ui-sidebar.service';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';

function FooterMembersControlObserver() {
  const { isMembersListOpen } = uiSidebarService.store;
  const members = conferenceService.roomStore.members;

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
