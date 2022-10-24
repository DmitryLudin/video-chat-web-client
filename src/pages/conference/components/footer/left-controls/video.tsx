import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import { FooterActionControl } from 'pages/conference/components/footer/components';
import { useCallback } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function FooterVideoControlObserver() {
  const localStreamService = conferenceService.localStreamService;
  const isPaused = localStreamService?.videoStore.isPaused ?? true;

  const onToggleVideo = useCallback(() => {
    if (isPaused) {
      localStreamService?.streamResume('video');
    } else {
      localStreamService?.streamPause('video');
    }
  }, [isPaused, localStreamService]);

  return (
    <FooterActionControl
      color={isPaused ? 'primary' : 'secondary'}
      icon={
        isPaused ? (
          <VideocamIcon sx={{ fontSize: '30px' }} />
        ) : (
          <VideocamOffIcon sx={{ fontSize: '30px' }} />
        )
      }
      onClick={onToggleVideo}
    />
  );
}

export const FooterVideoControl = withObserverMemo(FooterVideoControlObserver);
