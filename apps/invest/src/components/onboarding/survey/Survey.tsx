/** @format */

import { VoidComponent, For, Switch, Match, createSignal } from 'solid-js';
import Question from './Question';
import { useOnboarding } from '../Onboarding';
import { Form, Button } from '@arcane-web/alchemy-solid';
import type { OnboardingFormPages } from '../Onboarding.types';
import { createForm } from '@felte/solid';
import { Questions } from '../config';
import UpIcon from '../../../assets/up.svg';
import DownIcon from '../../../assets/down.svg';
import Progress from '../../progress/Progress';

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
    <Form ref={form} class="onboarding-content">
      <div class="onboarding-main">
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
      </div>

      <div class="onboarding-footer modal-horizontal">
        <div style={{ 'padding-right': '8px' }}>
          <Progress
            label="0% completed"
            max="100"
            value="0"
            id="survey-progress"
          />
        </div>
        <div class="multi-button">
          <button
            class="multi-button_button"
            type="button"
            onClick={() => props.onBack(data)}
          >
            <img src={DownIcon} style={{ filter: 'invert(1)' }} />
          </button>
          <button
            class="multi-button_button"
            disabled={props.route === 'warning' ? false : disableNext()}
            type="submit"
          >
            <img src={UpIcon} style={{ filter: 'invert(1)' }} />
          </button>
        </div>
      </div>
    </Form>
  );
};

export default OnboardingSurvey;
