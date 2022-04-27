import VideocamIcon from '@mui/icons-material/Videocam';
import { FooterActionControl } from 'modules/meeting/components/footer/components';
import React from 'react';

export function FooterVideoControl() {
  return (
    <FooterActionControl icon={<VideocamIcon sx={{ fontSize: '30px' }} />} />
  );
}
