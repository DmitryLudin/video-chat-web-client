import { Box } from '@mui/material';
import { Member } from 'pages/conference/components/media-content/members/member';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function MembersObserver() {
  const members = conferenceService.roomStore.members;

  return (
    <>
      {members.map((member) => (
        <Box
          key={member.id}
          width={240}
          height={180}
          minWidth={240}
          minHeight={180}
        >
          <Member member={member} />
        </Box>
      ))}
    </>
  );
}

export const Members = withObserverMemo(MembersObserver);
