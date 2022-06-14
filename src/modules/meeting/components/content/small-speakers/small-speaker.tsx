import { Video } from 'modules/meeting/components/content/video/video';
import React from 'react';
import { IMember } from 'shared/domains/meeting/models';

export function MeetingSmallSpeaker({ member }: { member: IMember }) {
  return <Video width="30vh" member={member} />;
}
