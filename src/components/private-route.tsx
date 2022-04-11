import { observer } from 'mobx-react-lite';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authService } from 'shared/domains/auth/auth.service';

function PrivateRouteObserver({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isAuthorized = authService.store.isAuthorized;

  if (!isAuthorized) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export const PrivateRoute = observer(PrivateRouteObserver);
