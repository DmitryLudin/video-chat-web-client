import { Media } from 'pages/conference/components/media-content/components/media/media';
import { RefCallback, useCallback } from 'react';
import { videoMediaConstraints } from 'shared/constants/media.constants';
import { producersService } from 'shared/domains/conference/domains/media-data/services';
import { IMember } from 'shared/domains/conference/models';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  member: IMember;
};

function SelfMemberObserver({ member }: TProps) {
  const onVideoCallback = useCallback<RefCallback<HTMLVideoElement>>(
    async (instance: HTMLVideoElement | null) => {
      if (!instance) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            ...videoMediaConstraints,
            deviceId: instance.id,
          },
        });
        instance.srcObject = stream;
        console.log('вызов создания продюсера');
        void producersService.createStreamProducer({
          track: stream.getVideoTracks()[0],
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  return <Media kind="self" member={member} videoRef={onVideoCallback} />;
}

export const SelfMember = withObserverMemo(SelfMemberObserver);
