import { Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import {
  ChatDrawerMobile,
  MembersDrawerMobile,
} from 'modules/conference/components/footer/drawers';
import { EndConferenceControl } from 'modules/conference/components/footer/end-conference-control';
import { FooterLeftControls } from 'modules/conference/components/footer/left-controls';
import { FooterRightControls } from 'modules/conference/components/footer/right-controls';
import React from 'react';

export const footerHeight = 92;

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
