/** @format */

import * as React from 'react';
import { useParams, Outlet } from 'react-router-dom';

const User: React.FC = () => {
  const params = useParams();

  // get trade user info and dispatch accountoptions action
  // make other entities :D

  return (
    <div>
      <h1>User</h1>
      <Outlet />
    </div>
  );
};

export default User;
