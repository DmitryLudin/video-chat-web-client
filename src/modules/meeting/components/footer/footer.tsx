import { Button, Grid, Paper, useMediaQuery, useTheme } from '@mui/material';
import { ChatDrawerMobile } from 'modules/meeting/components/footer/chat-drawer-mobile';
import { FooterLeftControls } from 'modules/meeting/components/footer/left-controls';
import { MembersDrawerMobile } from 'modules/meeting/components/footer/members-drawer-mobile';
import { FooterRightControls } from 'modules/meeting/components/footer/right-controls';
import React from 'react';

export const footerHeight = 92;

export function MeetingFooter() {
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

          <Button
            sx={{ borderRadius: 3, p: 2 }}
            variant="contained"
            color="error"
          >
            Завершить
          </Button>

          <FooterRightControls />
        </Grid>
      </Paper>

      <ChatDrawerMobile />
      <MembersDrawerMobile />
    </>
  );
}
