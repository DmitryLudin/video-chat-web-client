import { Video } from 'modules/conference/components/content/video/video';
import React from 'react';
import { IMember } from 'shared/domains/conference/models';

export function ConferenceSmallSpeaker({ member }: { member: IMember }) {
  return <Video width="30vh" member={member} />;
}
