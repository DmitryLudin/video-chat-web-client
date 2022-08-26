import { Video } from 'pages/conference/components/content/video/video';
import { useMemo } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function ConferenceMainSpeakerObserver() {
  const members = conferenceService.roomStore.members;
  const firstMemberInList = useMemo(() => members[0], [members]);

  return <Video member={firstMemberInList} />;
}

export const ConferenceMainSpeaker = withObserverMemo(
  ConferenceMainSpeakerObserver
);
