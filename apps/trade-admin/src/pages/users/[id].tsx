/** @format */

import { useParams } from '@solidjs/router';
import type { VoidComponent } from 'solid-js';

const User: VoidComponent = () => {
  const params = useParams();
  return <h2>{params.id}</h2>;
};

export default User;
