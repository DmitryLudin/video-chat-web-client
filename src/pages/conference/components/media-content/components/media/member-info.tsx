import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Box, Paper, Typography } from '@mui/material';
import ToggleIcon from 'material-ui-toggle-icon';
import { useMemo } from 'react';
import { IMember } from 'shared/domains/conference/models';

type TProps = {
  member: IMember;
  isAudioPaused?: boolean;
};

export function MemberInfo({ member, isAudioPaused }: TProps) {
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
        <ToggleIcon
          on={!isAudioPaused}
          onIcon={<MicIcon sx={{ color: '#fff' }} />}
          offIcon={<MicOffIcon sx={{ color: '#fff' }} />}
        />
      </Paper>
    </Box>
  );
}
