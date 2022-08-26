import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { EndConferenceControl } from 'pages/conference/components/footer/end-conference-control';
import { FooterLeftControls } from 'pages/conference/components/footer/left-controls';
import { FooterRightControls } from 'pages/conference/components/footer/right-controls';
import { footerHeight } from 'pages/conference/consts';

import { ChatDrawerMobile, MembersDrawerMobile } from './drawers';

export function ConferenceFooter() {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Paper
        sx={{
          height: footerHeight,
          px: isSmallDevice ? 2 : 3,
          mt: 'auto',
          display: 'flex',
          alignItems: 'center',
          borderRight: 0,
          borderBottom: 0,
          borderLeft: 0,
        }}
        square
        variant="outlined"
        component="footer"
      >
        <Grid container alignItems="center" justifyContent="space-between">
          <FooterLeftControls />

          <EndConferenceControl />

          <FooterRightControls />
        </Grid>
      </Paper>

      <ChatDrawerMobile />
      <MembersDrawerMobile />
    </>
  );
}
