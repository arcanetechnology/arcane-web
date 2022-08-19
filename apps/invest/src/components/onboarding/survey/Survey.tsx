/** @format */

import {
  VoidComponent,
  For,
  Switch,
  Match,
  createSignal,
  onMount,
  createEffect,
  Show,
} from 'solid-js';
import Question from './Question';
import { useOnboarding } from '../Onboarding';
import { Form, Button } from '@arcane-web/alchemy-solid';
import type { OnboardingFormPages } from '../Onboarding.types';
import { createForm } from '@felte/solid';
import { Questions } from '../config';
import UpIcon from '../../../assets/up.svg';
import DownIcon from '../../../assets/down.svg';
import back from '../../../assets/back.svg';
import Progress from '../../progress/Progress';
import './Survey.scss';
import OnboardingLogo from '../../../assets/onboarding.svg';
import { isSmall } from '../..';

type OnboardingSurveyProps = {
  route: Questions;
};

const OnboardingSurvey: VoidComponent<
  OnboardingFormPages & OnboardingSurveyProps
> = (props) => {
  const { nodes } = useOnboarding();
  const [disableNext, setDiabledNext] = createSignal(true);
  const [surveyProgress, setSurveyProgress] = createSignal(0);
  const { form, data, setData } = createForm({
    onSubmit: props.onSubmit,
    validate: (data) => {
      setDiabledNext(Object.keys(data).length === 0);
    },
  });

  onMount(() => {
    setSurveyProgress(props.progress);
  });

  createEffect(() => {
    const totalSurveyQuestions = nodes.length + props.totalPages;
    let currentProgress = props.progress;
    if (props.route !== 'warning') {
      currentProgress = currentProgress + Number(props.route.slice(-1));
    } else {
      currentProgress = currentProgress + nodes.length;
    }
    setSurveyProgress(
      Math.trunc((currentProgress / totalSurveyQuestions) * 100)
    );
  });

  return (
    <div class="onboarding-survey">
      <div class="onboarding-survey-title">
        <img src={OnboardingLogo} alt="onboarding logo" />
        <p class="body1">Welcome to Arcane Invest</p>
      </div>
      <Form ref={form}>
        <div class="onboarding-survey-content">
          <Show when={props.route === 'warning'}>
            <div style={{ 'padding-bottom': '8px' }}>
              <p class={isSmall() ? 'body1' : 'heading8'}>WARNING</p>
            </div>
          </Show>
          <Switch>
            <For each={nodes}>
              {(node) => {
                return (
                  <Match when={props.route === node.name}>
                    <div
                      class={
                        props.route === 'warning' && isSmall()
                          ? 'onboarding-warning-mobile'
                          : 'onboarding-survey-text'
                      }
                    >
                      <Question
                        onSubmit={props.onSubmit}
                        onChange={setData}
                        question={node}
                      />
                    </div>
                  </Match>
                );
              }}
            </For>
          </Switch>
        </div>
        <div
          class={
            props.route === 'warning' && isSmall()
              ? 'onboarding-warning-mobile-action'
              : 'onboarding-survey-action'
          }
        >
          {props.route === 'warning' ? (
            <div>
              <Button
                onClick={() => props.onSubmit({ [props.route]: 'yes' })}
                type="button"
                variant="secondary"
                size="medium"
              >
                {/* <img src={aLetter} /> */}
                <span>I Agree with terms and conditions</span>
              </Button>
            </div>
          ) : (
            <div class="onboarding-survey-questions">
              <Button
                onClick={() => props.onSubmit({ [props.route]: 'yes' })}
                type="button"
                variant="secondary"
                size="medium"
              >
                {/* <img src={aLetter} /> */}
                <span>Yes</span>
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="medium"
                onClick={() => props.onSubmit({ [props.route]: 'no' })}
              >
                {/* <img src={bLetter} /> */}
                <span>No</span>
              </Button>
            </div>
          )}
        </div>

        <div class="onboarding-survey-footer">
          <div>
            <Progress
              label={`${surveyProgress()}% Completed`}
              max="100"
              value={`${surveyProgress()}`}
              id="survey-progress"
            />
          </div>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              props.onBack(data);
            }}
            type="button"
          >
            <img width={15} src={back} style={{ filter: 'invert(1)' }} />
            Back
          </Button>

          {/*  <div class="multi-button">
        <button
          class="multi-button_button"
          type="button"
          onClick={() => {
            props.onBack(data);
          }}
        >
          <img width={15} src={DownIcon} style={{ filter: 'invert(1)' }} />
        </button>
        <button
          class="multi-button_button"
          disabled={props.route === 'warning' ? false : disableNext()}
          type="submit"
        >
          <img width={15} src={UpIcon} style={{ filter: 'invert(1)' }} />
        </button>
      </div> */}
        </div>
      </Form>
    </div>
  );
};

export default OnboardingSurvey;
