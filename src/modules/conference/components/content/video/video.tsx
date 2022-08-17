import { Paper } from '@mui/material';
import { MemberInfo } from 'modules/conference/components/content/video/member-info';
import React from 'react';
import { IMember } from 'shared/domains/conference/models';

type TProps = {
  width?: string;
  member: IMember;
};

export function Video({ member, width = '100%' }: TProps) {
  return (
    <Paper
      sx={{
        position: 'relative',
        width,
        minWidth: '30vh',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <img
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="https://www.business.com/images/content/5f2/872bf7b437456608b4567/1500-0-"
      />
      <MemberInfo member={member} />
    </Paper>
  );
}
