/** @format */

import { VoidComponent, For, Switch, Match, createSignal } from 'solid-js';
import Question from './Question';
import { useOnboarding } from '../Onboarding';
import { Form, Button } from '@arcane-web/alchemy-solid';
import type { OnboardingFormPages } from '../Onboarding.types';
import { createForm } from '@felte/solid';
import { Questions } from '../config';

type OnboardingSurveyProps = {
  route: Questions;
};

const OnboardingSurvey: VoidComponent<
  OnboardingFormPages & OnboardingSurveyProps
> = (props) => {
  const questions = useOnboarding();
  const [disableNext, setDiabledNext] = createSignal(true);
  const { form, data } = createForm({
    onSubmit: props.onSubmit,
    validate: (data) => {
      setDiabledNext(Object.keys(data).length === 0);
    },
  });

  return (
    <Form
      ref={form}
      style={{
        display: 'grid',
        'grid-template-rows': '90% 10%',
        height: '100%',
      }}
    >
      <Switch>
        <For each={questions}>
          {(node) => {
            return (
              <Match when={props.route === node.name}>
                <Question question={node} />
              </Match>
            );
          }}
        </For>
      </Switch>

      <div class="align-row w-full">
        <Button type="button" onClick={() => props.onBack(data)}>
          Back
        </Button>
        <div
          style={{
            'flex-grow': 1,
          }}
        />
        <Button disabled={disableNext()} type="submit" variant="primary">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default OnboardingSurvey;
