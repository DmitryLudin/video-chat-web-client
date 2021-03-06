import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { FooterChatControl } from 'modules/meeting/components/footer/right-controls/chat';
import { FooterMoreControl } from 'modules/meeting/components/footer/right-controls/more';
import { FooterShareScreenControl } from 'modules/meeting/components/footer/right-controls/share-screen';
import React from 'react';

export function FooterRightControls() {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {isSmallDevice ? (
        <FooterMoreControl />
      ) : (
        <Box>
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <FooterShareScreenControl />
            </Grid>
            <Grid item>
              <FooterChatControl />
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
