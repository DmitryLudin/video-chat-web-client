import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { Box, Paper } from '@mui/material';
import { Loader } from 'components/loader';
import { MemberInfo } from 'pages/conference/components/media-content/components/media/member-info';
import { Ref } from 'react';
import { IMember } from 'shared/domains/conference/models';

type TProps = {
  member: IMember;
  videoRef: Ref<HTMLVideoElement>;
  audioRef: Ref<HTMLAudioElement>;
  isVideoPaused?: boolean;
  isAudioPaused?: boolean;
  isLoading?: boolean;
};

export function Media({
  member,
  isLoading,
  isVideoPaused,
  isAudioPaused,
  videoRef,
  audioRef,
}: TProps) {
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
      {isLoading ? (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Loader />
        </Box>
      ) : (
        <>
          {isVideoPaused && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <VideocamOffIcon color="primary" sx={{ fontSize: '42px' }} />
            </Box>
          )}

          <video
            width="100%"
            height="100%"
            ref={videoRef}
            autoPlay
            id={`${member.id}_video`}
            playsInline
            muted
            style={{
              display: isVideoPaused ? 'none' : 'block',
              position: 'absolute',
              top: 0,
              left: 0,
              objectFit: 'cover',
              objectPosition: 'center',
              transform: 'rotateY(180deg)',
            }}
          />

          <audio ref={audioRef} />
        </>
      )}
      <MemberInfo member={member} isAudioPaused={isAudioPaused} />
    </Paper>
  );
}
