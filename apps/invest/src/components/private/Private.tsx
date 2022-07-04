/** @format */

import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { useNavigate } from 'solid-app-router';
import type { JSXElement, FlowComponent } from 'solid-js';

type PrivateProps = {
  children: JSXElement;
};

const Private: FlowComponent<PrivateProps> = (props) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const state = useAuth(auth);
  if (state.error) {
    navigate('/invest', { replace: true });
  }
  return <>{props.children}</>;
};

export default Private;
