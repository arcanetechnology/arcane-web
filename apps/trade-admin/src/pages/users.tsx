/** @format */

import { useRouteData } from '@solidjs/router';
import { Show, VoidComponent } from 'solid-js';
import { UserList, UserListLoading } from '../components';
import { Users as UsersType } from '../types';

const Users: VoidComponent = () => {
  const [users]: Array<() => UsersType> = useRouteData();

  return (
    <Show when={users()} fallback={<UserListLoading />}>
      <UserList users={users()} />
    </Show>
  );
};

export default Users;
