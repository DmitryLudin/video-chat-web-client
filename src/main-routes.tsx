import { Layout } from 'components/layout';
import { PrivateRoute } from 'components/private-route';
import { HomePage } from 'modules/home/home.page';
import { LoginPage } from 'modules/log-in/log-in.page';
import { ConferencePage } from 'modules/conference/conference.page';
import { RegistrationPage } from 'modules/registration/registration.page';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from 'shared/constants/routes';

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path={AppRoutes.base} element={<Layout />}>
        <Route path={AppRoutes.logIn} element={<LoginPage />} />
        <Route path={AppRoutes.register} element={<RegistrationPage />} />
        <Route element={<PrivateRoute />}>
          <Route path={AppRoutes.base} element={<HomePage />} />
          <Route path={AppRoutes.conference} element={<ConferencePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
