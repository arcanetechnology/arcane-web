/** @format */

import { createResource, createSignal, onMount, VoidComponent } from 'solid-js';
import { Button } from '@arcane-web/alchemy-solid';
import { Dynamic } from 'solid-js/web';
import { Survey } from './survey';
import { CustomerFormPages } from './customer';
import { OnboardingFormPages } from './Onboarding.types';
import onboardingConfig, { Questions, Answers } from './config';
import ArcaneFlow from '@arcane-web/arcane-flow';
import { postUserRegistration } from '../../api';
import type { FundInfo } from '../../types/index';
import countries from '../../assets/countries.json';

const OnboardingWelcome: VoidComponent<OnboardingFormPages> = (props) => {
  return (
    <div
      style={{
        display: 'grid',
        'grid-template-rows': '90% 10%',
        height: '100%',
      }}
    >
      <p class="heading8">
        Thanks for your insterest in our fund. Before we proceed, we will ask
        you some questions that will help customize this solution to meet your
        own needs.
      </p>
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

const getFirstKeyOfObject = (obj: Record<string, string>) => {
  return Object.keys(obj)[0];
};

const updateOnboardingState = () => {
  const [onboardingState, setOnboardingState] = createSignal([]);

  const addOnboardingState = (newValue: Record<string, string>) => {
    const values = onboardingState();
    const filteredValues = values.filter(
      (i) => getFirstKeyOfObject(i) !== getFirstKeyOfObject(newValue)
    );
    setOnboardingState([...filteredValues, newValue]);
  };

  return { onboardingState, addOnboardingState };
};

const OnboardingForm: VoidComponent = () => {
  const { next, previous } = ArcaneFlow<Questions, Answers>(onboardingConfig);
  const [route, setRoute] = createSignal<Questions>();
  const [page, setPage] = createSignal(0);
  const [pagesState, setPagesState] = createSignal([]);
  const { onboardingState, addOnboardingState } = updateOnboardingState();
  const [body, setBody] = createSignal<{ body: FundInfo; name: string }>(null);
  // TODO: refactor it later
  const [register] = createResource(body, postUserRegistration, {
    deferStream: true,
  });

  function onSubmit(values) {
    try {
      if (page() === pages.length - 1) {
        const formBody = pagesState().reduce(
          (obj, item) => {
            const key = Object.keys(item)[0];
            if (!key) {
              return { ...obj };
            }

            if (key === 'companyBehalf') {
              return { ...obj };
            }

            if (key === 'countryCode') {
              item[key] = countries.find(
                (c) => item[key] === c[0].name
              )[0].code;
            }

            return Object.assign(obj, { [key]: item[key] });
          },
          // TODO: remove the hardcoding later alligator 🐊
          { phoneNumber: values, fundName: 'Arcane Assets Fund Limited' }
        );

        if (onboardingState().length <= 3) {
          // TODO: abstract it away in the arcane platorm
          setBody({
            body: { ...formBody, investorType: 'PROFESSIONAL' },
            name: 'invest',
          });
        } else {
          setBody({
            body: { ...formBody, investorType: 'ELECTIVE_PROFESSIONAL' },
            name: 'invest',
          });
        }
      } else {
        const nextState = [...pagesState()];
        if (page() === 1 && route() !== 'warning') {
          addOnboardingState(values);
          setRoute(next(route(), values[getFirstKeyOfObject(values)]));
        } else {
          nextState[page()] = values;
          setPagesState(nextState);
          const key = Object.keys(values)[0];
          if (key === 'companyBehalf' && values[key] === 'no') {
            setPage(page() + 2);
          } else {
            setPage(page() + 1);
          }
        }
      }
    } catch (err) {
      setBody({
        body: { investorType: 'NON_PROFESSIONAL' },
        name: import.meta.env.VITE_APP_NAME,
      });
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
    if (page() === 1 && route() !== 'question1') {
      setRoute(previous().node);
    } else {
      setPage(page() - 1);
    }
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
