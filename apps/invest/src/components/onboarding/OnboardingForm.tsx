/** @format */

import { createSignal, onMount, VoidComponent } from 'solid-js';
import { Button } from '@arcane-web/alchemy';
import { Dynamic } from 'solid-js/web';
import { Survey } from './survey';
import { CustomerFormPages } from './customer';
import { OnboardingFormPages } from './Onboarding.types';
import onboardingConfig, { Questions, Answers } from './config';
import ArcaneFlow from '@arcane-web/arcane-flow';

const OnboardingWelcome: VoidComponent<OnboardingFormPages> = (props) => {
  return (
    <div
      style={{
        display: 'grid',
        'grid-template-rows': '90% 10%',
        height: '100%',
      }}
    >
      <h4>
        Thanks for your insterest in our fund. Before we proceed, we will ask
        you some questions that will help customize this solution to meet your
        own needs.
      </h4>
      <div class="w-full">
        <Button
          class="w-full"
          type="button"
          variant="primary"
          onClick={() => props.onSubmit({})}
        >
          Start
        </Button>
      </div>
    </div>
  );
};

const pages = [OnboardingWelcome, Survey, ...CustomerFormPages];

const OnboardingForm: VoidComponent = () => {
  const { next } = ArcaneFlow<Questions, Answers>(onboardingConfig);
  const [route, setRoute] = createSignal<Questions>();
  const [page, setPage] = createSignal(0);
  const [pagesState, setPagesState] = createSignal([]);

  function onSubmit(values) {
    if (page() === pages.length - 1) {
      console.log('Submitted:', pagesState());
    } else {
      const nextState = [...pagesState()];
      nextState[page()] = values;
      setPagesState(nextState);
      if (page() === 1 && route() !== 'warning') {
        setRoute(next(route(), nextState[page()][route()]));
      } else {
        setPage(page() + 1);
      }
    }
  }

  onMount(() => {
    setRoute('question1');
  });

  function onBack(values) {
    if (page() === 0) return;
    const nextState = [...pagesState()];
    nextState[page()] = values;
    setPagesState(nextState);
    setPage(page() - 1);
  }

  return (
    <Dynamic<OnboardingFormPages>
      component={pages[page()]}
      onSubmit={onSubmit}
      onBack={onBack}
      route={route()}
    />
  );
};

export default OnboardingForm;
