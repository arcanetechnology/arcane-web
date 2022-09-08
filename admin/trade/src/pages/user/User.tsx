/** @format */

import * as React from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { UserView } from '../../components';

const User: React.FC = () => {
  const params = useParams();
  return (
    <div>
      <UserView id={params.userId as string} />
    </div>
  );
};

export default User;
