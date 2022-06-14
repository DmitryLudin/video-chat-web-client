import { Video } from 'modules/meeting/components/content/video/video';
import React, { useMemo } from 'react';
import { meetingService } from 'shared/domains/meeting/meeting.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function MeetingMainSpeakerObserver() {
  const members = meetingService.store.members;
  const firstMemberInList = useMemo(() => members[0], [members]);

  return <Video member={firstMemberInList} />;
}

export const MeetingMainSpeaker = withObserverMemo(MeetingMainSpeakerObserver);
