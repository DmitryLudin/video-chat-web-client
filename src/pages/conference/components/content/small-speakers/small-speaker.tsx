import { Video } from 'pages/conference/components/content/video/video';

import { IMember } from 'shared/domains/conference/models';

export function ConferenceSmallSpeaker({ member }: { member: IMember }) {
  return <Video width="30vh" member={member} />;
}
