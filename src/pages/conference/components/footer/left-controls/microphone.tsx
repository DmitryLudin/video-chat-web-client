import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ToggleIcon from 'material-ui-toggle-icon';
import { FooterActionControl } from 'pages/conference/components/footer/components';
import { useCallback } from 'react';
import { conferenceService } from 'shared/domains/conference/conference.service';
import { withObserverMemo } from 'shared/hoc/with-observer-memo.hoc';

function FooterMicrophoneControlObserver() {
  const localStreamService = conferenceService.localStreamService;
  const isPaused = localStreamService?.audioStore.isPaused ?? true;

  const onToggleAudio = useCallback(() => {
    if (isPaused) {
      localStreamService?.streamResume('audio');
    } else {
      localStreamService?.streamPause('audio');
    }
  }, [isPaused, localStreamService]);

  return (
    <FooterActionControl
      color={isPaused ? 'primary' : 'secondary'}
      icon={
        <ToggleIcon
          on={!isPaused}
          onIcon={<MicIcon sx={{ fontSize: '30px' }} />}
          offIcon={<MicOffIcon sx={{ fontSize: '30px' }} />}
        />
      }
      onClick={onToggleAudio}
    />
  );
}

export const FooterMicrophoneControl = withObserverMemo(
  FooterMicrophoneControlObserver
);
