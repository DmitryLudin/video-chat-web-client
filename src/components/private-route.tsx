import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const user = true;

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
