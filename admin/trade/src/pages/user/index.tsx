/** @format */

import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Users from './Users';

const User: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  );
};

export default User;
