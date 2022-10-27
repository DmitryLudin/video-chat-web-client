import { Media } from 'pages/conference/components/media-content/components/media/media';
import { RefCallback, useCallback } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { IMember } from 'shared/domains/conference/models';
import { User } from 'shared/domains/user/user.model';
import { userService } from 'shared/domains/user/user.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  member: IMember;
};

function MemberObserver({ member }: TProps) {
  const user = userService.store.user as User;
  const isSelfMember = member.user.id === user.id;

  const mediaData = conferenceService.getStreamServiceByMemberId(member.id);
  const videoStream = mediaData?.videoStore.localStream;
  const audioStream = mediaData?.audioStore.localStream;
  const isVideoPaused = mediaData?.videoStore.isPaused;
  const isAudioPaused = mediaData?.audioStore.isPaused;
  const isSpeaking = mediaData?.audioStore.isSpeaking;
  const isLoading =
    (mediaData?.videoStore?.isLoading || mediaData?.audioStore.isLoading) ??
    true;

  const onVideoCallback = useCallback<RefCallback<HTMLVideoElement>>(
    (instance: HTMLVideoElement | null) => {
      if (!instance || !videoStream) return;

      instance.srcObject = videoStream;
      void instance
        .play()
        .then(() => console.log('video played'))
        .catch(console.log);
    },
    [videoStream]
  );

  const onAudioCallback = useCallback<RefCallback<HTMLAudioElement>>(
    (instance: HTMLAudioElement | null) => {
      if (isSelfMember || !instance || !audioStream) return;

      instance.srcObject = audioStream;
      void instance
        .play()
        .then(() => console.log('audio played'))
        .catch(console.log);
    },
    [audioStream, isSelfMember]
  );

  return (
    <Media
      member={member}
      isLoading={isLoading}
      isVideoPaused={isVideoPaused}
      isAudioPaused={isAudioPaused}
      isSpeaking={isSpeaking}
      videoRef={onVideoCallback}
      audioRef={onAudioCallback}
    />
  );
}

export const Member = withObserverMemo(MemberObserver);
