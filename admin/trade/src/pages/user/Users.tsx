/** @format */

import * as React from 'react';

import UserList from '../../components/users/UserList';
import { useTradeDispatch } from '../../state';
import { fetchUsers } from '../../state';

const Users: React.FC = () => {
  const dispatch = useTradeDispatch();

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <React.Fragment>
      <UserList />
    </React.Fragment>
  );
};

export default Users;
