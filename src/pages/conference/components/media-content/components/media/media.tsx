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
  isSpeaking?: boolean;
};

export function Media({
  member,
  isLoading,
  isVideoPaused,
  isAudioPaused,
  isSpeaking,
  videoRef,
  audioRef,
}: TProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        width: '100%',
        height: '0px',
        paddingTop: '56.25%',
        borderRadius: 3,
        overflow: 'hidden',
        transition:
          'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, outline 50ms linear',
        outline: (theme) =>
          isSpeaking ? `3px solid ${theme.palette.success.light}` : 'none',
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
              borderRadius: '12px',
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
