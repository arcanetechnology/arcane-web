/** @format */

import * as React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {
  return <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
