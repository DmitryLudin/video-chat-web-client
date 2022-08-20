import { Container, Grid } from '@mui/material';
import { CreateConferenceCard } from 'pages/home/create-conference-card';
import { JoinToConferenceCard } from 'pages/home/join-to-conference-card';
import React from 'react';

export function HomePage() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={4} justifyContent="center">
        <Grid item>
          <CreateConferenceCard />
        </Grid>
        <Grid item>
          <JoinToConferenceCard />
        </Grid>
      </Grid>
    </Container>
  );
}
