/** @format */

import {
  createContext,
  useContext,
  VoidComponent,
  createSignal,
  Show,
} from 'solid-js';
import { OnboardingNodes } from './Onboarding.types';
import OnboardingForm from './OnboardingForm';
import { Modal } from '@arcane-web/alchemy-solid';
import { Authentication } from '@arcane-web/arcane-components';
import 'tippy.js/dist/tippy.css';
import { useAuth } from '@arcane-web/arcane-auth';
import { getAuth } from 'firebase/auth';

const OnboardingContext = createContext<OnboardingNodes>([]);

type OnboardingProps = {
  questions: OnboardingNodes;
};

// TODO: update the action part make it look good.
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [isOpen, setModal] = createSignal<boolean>(false);
  const auth = getAuth();
  const state = useAuth(auth);
  console.log(state)
  return (
    <OnboardingContext.Provider value={props.questions}>
      <Show when={state.data} fallback={<Authentication />}>
        <button
          class="button button-primary"
          onClick={(e) => {
            if (state.error) {
              console.log('hello');
            } else {
              setModal(true);
            }
          }}
        >
          Contact Us
        </button>
      </Show>
      <button
        class="button button-primary"
        onClick={(e) => {
          if (state.error) {
            console.log('hello');
          } else {
            setModal(true);
          }
        }}
      >
        Contact Us
      </button>

      <Modal isOpen={isOpen()} toggleModal={setModal}>
        <article
          class="align-center"
          style={{
            'grid-template-rows': '20% 80%',
            height: '100%',
          }}
        >
          <h3>Investment Onboarding</h3>
          <OnboardingForm />
        </article>
      </Modal>
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
