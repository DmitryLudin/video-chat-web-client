import { Media } from 'pages/conference/components/media-content/components/media/media';
import { consumersService } from 'shared/domains/conference/domains/media-data/services';
import { IMember } from 'shared/domains/conference/models';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

type TProps = {
  member: IMember;
};

function OtherMemberObserver({ member }: TProps) {
  const consumer = consumersService.store.consumers.get(member.id);
  const videoTrack = consumer?.get('video')?.track;

  const onVideoCallback = (instance: HTMLVideoElement | null) => {
    if (instance && videoTrack) {
      console.log(videoTrack);
      const stream = new MediaStream([videoTrack.clone()]);
      stream.addTrack(videoTrack);
      instance.srcObject = stream;
      void instance
        .play()
        .then(() => console.log('played'))
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return <Media kind="other" member={member} videoRef={onVideoCallback} />;
}

export const OtherMember = withObserverMemo(OtherMemberObserver);
