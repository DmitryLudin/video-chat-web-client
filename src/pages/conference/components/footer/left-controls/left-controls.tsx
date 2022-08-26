import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { FooterMembersControl } from 'pages/conference/components/footer/left-controls/members';
import { FooterMicrophoneControl } from 'pages/conference/components/footer/left-controls/microphone';
import { FooterVideoControl } from 'pages/conference/components/footer/left-controls/video';

export function FooterLeftControls() {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box>
      <Grid container spacing={isSmallDevice ? 1 : 3} alignItems="center">
        <Grid item>
          <FooterMicrophoneControl />
        </Grid>
        <Grid item>
          <FooterVideoControl />
        </Grid>
        <Grid sx={{ display: { xs: 'none', sm: 'flex' } }} item>
          <FooterMembersControl />
        </Grid>
      </Grid>
    </Box>
  );
}
