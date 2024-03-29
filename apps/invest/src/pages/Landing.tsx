/** @format */

import { Authentication } from '@arcane-web/arcane-components';
import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { VoidComponent, Show, createResource } from 'solid-js';
import { LandingComponent, Onboarding, OnboardingNodes } from '../components';
import queryClient from '../invest-contentful';
import { gql } from '@solid-primitives/graphql';
import { fetchUserRegistration } from '../api';

const Landing: VoidComponent = () => {
  const [questions] = queryClient<{
    onboardingStepCollection: { items: OnboardingNodes };
  }>(
    gql`
      query {
        onboardingStepCollection {
          items {
            name
            content {
              json
            }
          }
        }
      }
    `
  );
  createResource(fetchUserRegistration);
  const auth = getAuth();
  const state = useAuth(auth);

  return (
    <LandingComponent>
      {state.data || import.meta.env.DEV ? (
        <Show when={questions()}>
          <Onboarding questions={questions().onboardingStepCollection.items} />
        </Show>
      ) : (
        <Authentication
          loggedOutTitle="Learn More"
          title="Sign out"
          size="large"
        />
      )}
    </LandingComponent>
  );
};

export default Landing;
