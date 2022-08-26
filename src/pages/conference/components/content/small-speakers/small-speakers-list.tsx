import { Box, Stack } from '@mui/material';
import { ConferenceSmallSpeaker } from 'pages/conference/components/content/small-speakers/small-speaker';
import { useMemo } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function SmallSpeakersListObserver() {
  const members = conferenceService.roomStore.members;
  const membersWithoutFirst = useMemo(() => members.slice(1), [members]);

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Box sx={{ overflow: 'auto' }}>
        <Stack spacing={2} direction="row">
          {membersWithoutFirst.map((member) => (
            <ConferenceSmallSpeaker key={member.id} member={member} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export const SmallSpeakersList = withObserverMemo(SmallSpeakersListObserver);
