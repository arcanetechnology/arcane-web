/** @format */

import { useTradeSelector } from '@/state';
import { selectAuth } from '@/state/auth';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useTradeSelector(selectAuth);

  if (!auth) {
    return <Navigate to="/auth" replace />;
  }

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
