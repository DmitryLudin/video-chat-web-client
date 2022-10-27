import { Box } from '@mui/material';
import { Member } from 'pages/conference/components/media-content/members/member';
import { styled } from '@mui/material/styles';
import { useMemo } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

const MemberWrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    '&:first-child': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 1,
      gridRowEnd: 3,
    },
  },
}));

function MembersObserver() {
  const members = useMemo(
    () => conferenceService.getSortedMembers(),
    [
      conferenceService.mediaDataStore.activeMemberId,
      conferenceService.roomStore.members,
    ]
  );

  return (
    <>
      {members.map((member) => (
        <MemberWrapper key={member.id}>
          <Member member={member} />
        </MemberWrapper>
      ))}
    </>
  );
}

export const Members = withObserverMemo(MembersObserver);
