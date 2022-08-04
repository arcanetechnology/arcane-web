/** @format */

import {
  createEffect,
  createResource,
  createSignal,
  on,
  onMount,
  VoidComponent,
} from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Survey } from './survey';
import { CustomerFormPages } from './customer';
import { OnboardingFormPages } from './Onboarding.types';
import onboardingConfig, { Questions, Answers } from './config';
import ArcaneFlow from '@arcane-web/arcane-flow';
import { postUserRegistration } from '../../api';
import type { FundInfo } from '../../types/index';
import countries from '../../assets/countries.json';
import type { Country } from '../../invest.types';
import OnboardingWelcomePage from './OnboardingWelcomPage';

const pages = [OnboardingWelcomePage, Survey, ...CustomerFormPages];

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

  const [{ loading, error }, { refetch }] = createResource(
    body,
    postUserRegistration,
    {
      deferStream: true,
    }
  );

  function onSubmit(values) {
    try {
      if (page() === pages.length - 1) {
        console.log('second time??');
        console.log(error);
        console.log(loading);
        console.log(pagesState());
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
              item[key] = (
                countries.find(
                  (c: Country) => item[key] === c.displayName
                ) as Country
              ).isO3CountyCode;
            }

            return Object.assign(obj, { [key]: item[key] });
          },
          // TODO: remove the hardcoding later alligator 🐊
          { phoneNumber: values, fundName: 'Arcane Assets Fund Limited' }
        );
        delete formBody['warning'];

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
      progress={page()}
      component={pages[page()]}
      onSubmit={onSubmit}
      onBack={onBack}
      totalPages={pages.length}
      route={route()}
    />
  );
};

export default OnboardingForm;
