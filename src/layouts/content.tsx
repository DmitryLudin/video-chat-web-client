import { Box, Container } from '@mui/material';
import { PrivateRoute } from 'components/private-route';
import { HomePage } from 'modules/home/home.page';
import { LoginPage } from 'modules/log-in/log-in.page';
import { MeetingPage } from 'modules/meeting/meeting.page';
import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

export const Content = memo(function ContentMemo() {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        pt: 6,
        pb: 4,
        flexGrow: 1,
      }}
    >
      <Container component="main" maxWidth="xl">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="meeting/:id" element={<MeetingPage />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </Container>
    </Box>
  );
});
