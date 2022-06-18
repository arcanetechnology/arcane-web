/** @format */

import {
  createContext,
  useContext,
  VoidComponent,
  createSignal,
} from 'solid-js';
import { OnboardingNodes } from '../../types';
import OnboardingForm from './OnboardingForm';
import { Button, Modal } from '@arcane-web/alchemy';
import 'tippy.js/dist/tippy.css';

const OnboardingContext = createContext<OnboardingNodes>([]);

type OnboardingProps = {
  questions: OnboardingNodes;
};

// TODO: update the modal component and make it simple damnit
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [isOpen, setModal] = createSignal<boolean>(false);
  return (
    <OnboardingContext.Provider value={props.questions}>
      <>
        <Button type="button" variant="primary" onClick={() => setModal(true)}>
          Contact Us
        </Button>
        <Modal isOpen={isOpen()}>
          <Modal.Title toggleModal={setModal}>
            <h3>Investment Onboarding</h3>
          </Modal.Title>
          <Modal.Content toggleModal={setModal}>
            <OnboardingForm />
          </Modal.Content>
        </Modal>
      </>
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
