/** @format */

import type { VoidComponent } from 'solid-js';
import { UserProfile } from '../../types';

type UserInfoProps = {
  profile: UserProfile;
};

const UserInfo: VoidComponent<UserInfoProps> = (props) => {
  return (
    <div>
      <div>
        <p>User Id: {props.profile.id}</p>
      </div>
      <div>
        <p>User Email: {props.profile.email}</p>
      </div>
    </div>
  );
};

export default UserInfo;
