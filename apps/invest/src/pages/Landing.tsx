/** @format */

import { Authentication } from '@arcane-web/arcane-components';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { useNavigate } from 'solid-app-router';
import { createEffect, VoidComponent } from 'solid-js';
import { LandingComponent } from '../components';

const Landing: VoidComponent = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const state = useAuth(auth);

  createEffect(() => {
    if (state.data) {
      navigate('/home', { replace: true });
    }
  });
  return (
    <>
      <LandingComponent>
        <Authentication
          loggedOutTitle="Sign in to Contact Us..."
          title="Sign out"
        />
      </LandingComponent>
    </>
  );
};

export default Landing;
