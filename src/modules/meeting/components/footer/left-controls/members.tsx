import PeopleIcon from '@mui/icons-material/People';
import { Badge } from '@mui/material';
import { FooterActionControl } from 'modules/meeting/components/footer/action-control';
import React from 'react';

export function FooterMembersControl() {
  return (
    <FooterActionControl
      icon={
        <Badge badgeContent={4} color="secondary">
          <PeopleIcon sx={{ fontSize: '30px' }} />
        </Badge>
      }
    />
  );
}
