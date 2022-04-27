import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import { FooterActionControl } from 'modules/meeting/components/footer/components';
import React from 'react';

export function FooterShareScreenControl() {
  return (
    <FooterActionControl icon={<ScreenShareIcon sx={{ fontSize: '30px' }} />} />
  );
}
