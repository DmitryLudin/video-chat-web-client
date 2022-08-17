import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppRoutes } from 'shared/constants/routes';
import { authService } from 'shared/domains/auth/auth.service';

function PrivateRouteObserver() {
  const location = useLocation();
  const isAuthorized = authService.store.isAuthorized;

  if (!isAuthorized) {
    return <Navigate to={AppRoutes.logIn} state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export const PrivateRoute = observer(PrivateRouteObserver);
