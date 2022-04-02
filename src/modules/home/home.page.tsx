import { Container, Grid } from '@mui/material';
import { HomeCreateMeetingCard } from 'modules/home/create-meeting-card';
import { JoinToMeetingCard } from 'modules/home/join-to-meeting-card';
import React from 'react';

export function HomePage() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <HomeCreateMeetingCard />
        </Grid>
        <Grid item>
          <JoinToMeetingCard />
        </Grid>
      </Grid>
    </Container>
  );
}
