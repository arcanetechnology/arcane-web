/** @format */

import {
  createContext,
  useContext,
  VoidComponent,
  createSignal,
} from 'solid-js';
import { OnboardingNodes } from '../../types';
import OnboardingForm from './OnboardingForm';
import { Button, Modal } from '@arcane-web/alchemy-solid';
import 'tippy.js/dist/tippy.css';

const OnboardingContext = createContext<OnboardingNodes>([]);

type OnboardingProps = {
  questions: OnboardingNodes;
};

// TODO: update the action part make it look good.
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [isOpen, setModal] = createSignal<boolean>(false);
  return (
    <OnboardingContext.Provider value={props.questions}>
      <button class="button button-primary" onClick={(e) => setModal(true)}>
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
