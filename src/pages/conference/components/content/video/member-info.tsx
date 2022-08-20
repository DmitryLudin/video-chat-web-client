import MicIcon from '@mui/icons-material/Mic';
import { Box, Paper, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { IMember } from 'shared/domains/conference/models';

type TProps = {
  member: IMember;
};

export function MemberInfo({ member }: TProps) {
  const displayName = useMemo(
    () => member.displayName || member.user.displayName || member.user.username,
    [member.displayName, member.user.displayName, member.user.username]
  );

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Paper
        sx={{
          width: 'auto',
          maxWidth: '70%',
          px: 1,
          py: 0.5,
          borderRadius: 2,
          bgcolor: 'rgba(24, 24, 26, 0.85)',
        }}
      >
        <Typography
          overflow="hidden"
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          color="#fff"
          variant="body2"
        >
          {displayName}
        </Typography>
      </Paper>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 1,
          py: 0.5,
          borderRadius: 2,
          bgcolor: 'rgba(117, 88, 224, 0.85)',
        }}
      >
        <MicIcon sx={{ color: '#fff' }} />
      </Paper>
    </Box>
  );
}
