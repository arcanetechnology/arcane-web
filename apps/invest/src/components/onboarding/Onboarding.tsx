/** @format */

import {
  createContext,
  useContext,
  VoidComponent,
  createSignal,
} from 'solid-js';
import { OnboardingNodes } from './Onboarding.types';
import OnboardingForm from './OnboardingForm';
import { Modal, Button } from '@arcane-web/alchemy-solid';
import OnboardingLogo from '../../assets/onboarding.svg';
import 'tippy.js/dist/tippy.css';
import close from '../../assets/close.svg';
import './Onboarding.scss';

const OnboardingContext = createContext<OnboardingNodes>([]);

type OnboardingProps = {
  questions: OnboardingNodes;
};

// TODO: update the action part make it look good.
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [isOpen, setModal] = createSignal<boolean>(false);

  return (
    <OnboardingContext.Provider value={props.questions}>
      <Button
        size={'large'}
        onClick={() => setModal(true)}
        title="sign into arcane platform"
        variant="primary"
        id="auth"
      >
        Contact Us
      </Button>
      <Modal
        closeIcon={() => <img src={close} alt="modal close" />}
        size="small"
        isOpen={isOpen()}
        toggleModal={setModal}
        class="onboarding-modal"
      >
        <article
          class="align-center"
          style={{
            'min-width': '360px',
            'grid-template-rows': '20% 80%',
            'min-height': '400px',
          }}
        >
          <div class="align-row gap-small">
            <img src={OnboardingLogo} alt="onboarding logo" />
            <p class="heading8">Investment Onboarding</p>
          </div>
          <OnboardingForm />
        </article>
      </Modal>
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
