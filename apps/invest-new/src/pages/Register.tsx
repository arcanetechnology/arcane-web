/** @format */

import { VoidComponent, Show } from 'solid-js';
import Invest from '../assets/invest.svg';
import { gql } from '@solid-primitives/graphql';
import queryClient from '../invest-contentful';
import { Onboarding, OnboardingNodes } from '../components';

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
    <>
      <section class="margin-48">
        <div class="container align-center">
          <h1>
            <b>
              Build generational wealth with our actively managed crypto fund.
            </b>
          </h1>
        </div>
      </section>
      <section class="margin-48">
        <div id="apology-message" class="container" data-auto-grid="2">
          <div class="space-8">
            <Invest />
          </div>
          <div class="space-8 align-vertical">
            <h1>The fund.</h1>
            <h4 class="secondary-text">
              Get managed exposure to cryptocurrencies as an asset class.
            </h4>
            <div class="margin-top-16">
              <Show when={questions()}>
                <Onboarding
                  questions={questions().onboardingStepCollection.items}
                />
              </Show>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
