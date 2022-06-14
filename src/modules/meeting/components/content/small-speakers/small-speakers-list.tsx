import { Box, Stack } from '@mui/material';
import { MeetingSmallSpeaker } from 'modules/meeting/components/content/small-speakers/small-speaker';
import React, { useMemo } from 'react';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function SmallSpeakersListObserver() {
  const members = meetingService.store.members;
  const membersWithoutFirst = useMemo(() => members.slice(1), [members]);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ overflow: 'auto' }}>
        <Stack spacing={2} direction="row">
          {membersWithoutFirst.map((member) => (
            <MeetingSmallSpeaker key={member.id} member={member} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export const SmallSpeakersList = withObserverMemo(SmallSpeakersListObserver);
