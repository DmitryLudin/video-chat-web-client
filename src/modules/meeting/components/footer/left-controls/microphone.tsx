import MicIcon from '@mui/icons-material/Mic';
import { FooterActionControl } from 'modules/meeting/components/footer/components';
import React from 'react';

export function FooterMicrophoneControl() {
  return <FooterActionControl icon={<MicIcon sx={{ fontSize: '30px' }} />} />;
}
