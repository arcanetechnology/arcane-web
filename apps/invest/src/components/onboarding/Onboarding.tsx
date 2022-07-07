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

const OnboardingContext = createContext<OnboardingNodes>([]);

type OnboardingProps = {
  questions: OnboardingNodes;
};

// TODO: update the action part make it look good.
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [isOpen, setModal] = createSignal<boolean>(false);
  // TODO: check if we need this auto trigger
  // onMount(() => setModal(true));
  return (
    <OnboardingContext.Provider value={props.questions}>
      <Button
        size={'large'}
        onClick={(e) => setModal(true)}
        title="sign into arcane platform"
        variant="primary"
        id="auth"
      >
        Contact Us
      </Button>
      <Modal isOpen={isOpen()} toggleModal={setModal}>
        <article
          class="align-center"
          style={{
            'grid-template-rows': '20% 80%',
            height: '100%',
          }}
        >
          <div class="align-row gap-small">
            <OnboardingLogo />
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
