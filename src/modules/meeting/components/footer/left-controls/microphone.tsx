import MicIcon from '@mui/icons-material/Mic';
import { FooterActionControl } from 'modules/meeting/components/footer/action-control';
import React from 'react';

export function FooterMicrophoneControl() {
  return <FooterActionControl icon={<MicIcon sx={{ fontSize: '30px' }} />} />;
}
