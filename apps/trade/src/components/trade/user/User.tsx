/** @format */

import { createResource, VoidComponent } from 'solid-js';

const fetchUser = async (id: string) => (await fetch(`/users/${id}`)).json();

type UserProps = {
  id: string;
};

const User: VoidComponent<UserProps> = (props) => {
  const [user] = createResource(props.id, fetchUser);
  return <h1>{JSON.stringify(user)}</h1>;
};

export default User;
