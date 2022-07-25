/** @format */

import { VoidComponent, Show } from 'solid-js';
import Invest from '../assets/invest.svg';
import { gql } from '@solid-primitives/graphql';
import queryClient from '../invest-contentful';
import {
  LandingComponent,
  Onboarding,
  OnboardingNodes,
  Private,
} from '../components';

const Register: VoidComponent = () => {
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

  return (
    <Private>
      <LandingComponent>
        <Show when={questions()}>
          <Onboarding questions={questions().onboardingStepCollection.items} />
        </Show>
      </LandingComponent>
    </Private>
  );
};

export default Register;

// TODO scss alchemy file.
// TODO alchemy solid and react



