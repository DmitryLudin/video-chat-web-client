import { Box } from '@mui/material';
import { PrivateRoute } from 'components/private-route';
import { HomePage } from 'modules/home/home.page';
import { LoginPage } from 'modules/log-in/log-in.page';
import { MeetingPage } from 'modules/meeting/meeting.page';
import { RegistrationPage } from 'modules/registration/registration.page';
import React, { memo } from 'react';
import { Route, Routes } from 'react-router-dom';

export const MainRoutes = memo(function MainRoutesMemo() {
  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      <Routes>
        <Route
          path="/log-in"
          element={
            <Box sx={{ pt: 6, pb: 4 }}>
              <LoginPage />
            </Box>
          }
        />
        <Route
          path="/register"
          element={
            <Box sx={{ pt: 6, pb: 4 }}>
              <RegistrationPage />
            </Box>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Box sx={{ pt: 6, pb: 4 }}>
                      <HomePage />
                    </Box>
                  }
                />
                <Route path="meeting/:id" element={<MeetingPage />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </Box>
  );
});
