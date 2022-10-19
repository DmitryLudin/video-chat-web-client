import { Box, Stack } from '@mui/material';
import { Member } from 'pages/conference/components/media-content/members/member';
import { OtherMember } from 'pages/conference/components/media-content/members/member/other-member';
import { SelfMember } from 'pages/conference/components/media-content/members/member/self-member';
import { Fragment } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function MembersObserver() {
  const members = conferenceService.roomStore.members;

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ overflow: 'auto' }}>
        <Stack spacing={2} direction="row">
          {members.map((member) => (
            <Fragment key={member.id}>
              <Box width={240} height={180} minWidth={240} minHeight={180}>
                <SelfMember member={member} />
              </Box>
              <Box width={240} height={180} minWidth={240} minHeight={180}>
                <OtherMember member={member} />
              </Box>
            </Fragment>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export const Members = withObserverMemo(MembersObserver);
