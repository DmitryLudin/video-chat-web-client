import { FooterActionControl } from 'modules/meeting/components/footer/action-control';
import VideocamIcon from '@mui/icons-material/Videocam';
import React from 'react';

export function FooterVideoControl() {
  return (
    <FooterActionControl icon={<VideocamIcon sx={{ fontSize: '30px' }} />} />
  );
}
