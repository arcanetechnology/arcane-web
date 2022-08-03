/** @format */

import { useRouteData } from '@solidjs/router';
import { Show, VoidComponent } from 'solid-js';
import { Transactions, OperationProvider, UserInfo } from '../../components';
import { GetUserInfo } from '../../types/api';

const User: VoidComponent = () => {
  const [userInfo]: Array<() => GetUserInfo> = useRouteData();
  return (
    <Show when={userInfo()} fallback={<div>Loading User Info...</div>}>
      <h6>User Info</h6>
      <UserInfo profile={userInfo().user} />
      <OperationProvider profiles={userInfo().user.profiles}>
        <Transactions />
      </OperationProvider>
    </Show>
  );
};

export default User;
