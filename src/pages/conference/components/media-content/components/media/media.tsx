import { Paper } from '@mui/material';
import { MemberInfo } from 'pages/conference/components/media-content/components/media/member-info';
import { Ref } from 'react';
import { IMember } from 'shared/domains/conference/models';

type TProps = {
  kind: string;
  member: IMember;
  videoRef: Ref<HTMLVideoElement>;
  audioRef?: Ref<HTMLAudioElement>;
};

export function Media({ member, videoRef, kind }: TProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        width: '100%',
        height: '0px',
        paddingTop: '75%',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <video
        width="100%"
        height="100%"
        ref={videoRef}
        autoPlay
        id={`${member.id}_${kind}_video`}
        playsInline
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover',
          objectPosition: 'center',
          transform: 'rotateY(180deg)',
        }}
      />
      <audio />
      <MemberInfo member={member} />
    </Paper>
  );
}
