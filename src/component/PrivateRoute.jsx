import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';

const PrivateRoute = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <WelcomePage/>;
};

export default PrivateRoute;