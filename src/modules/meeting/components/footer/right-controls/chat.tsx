import ChatIcon from '@mui/icons-material/Chat';
import { Badge } from '@mui/material';
import { FooterActionControl } from 'modules/meeting/components/footer/action-control';
import React from 'react';

export function FooterChatControl() {
  return (
    <FooterActionControl
      color="secondary"
      icon={
        <Badge badgeContent={200} color="primary">
          <ChatIcon sx={{ fontSize: '30px' }} />
        </Badge>
      }
    />
  );
}
