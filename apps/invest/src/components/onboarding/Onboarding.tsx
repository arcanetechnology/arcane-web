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
import arrow from '../../assets/arrow.svg';
import './Onboarding.scss';
import { Questions } from './config';

const OnboardingContext = createContext<{
  nodes: OnboardingNodes;
  counter: () => number;
  updateCounter: (questions: Questions) => void;
}>({
  nodes: [],
  counter: () => 0,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCounter: (questions: Questions) => {},
});

type OnboardingProps = {
  questions: OnboardingNodes;
};

// TODO: update the action part make it look good.
export const Onboarding: VoidComponent<OnboardingProps> = (props) => {
  const [isOpen, setModal] = createSignal<boolean>(false);
  const [counter, setCounter] = createSignal(0),
    store = {
      nodes: props.questions,
      counter,
      updateCounter: (questions: Questions) => {
        switch (questions) {
          case 'warning':
            setCounter(props.questions.length);
            break;
          case 'question1':
            setCounter(1);
            break;
          case 'question2':
            setCounter(2);
            break;
          case 'question3':
            setCounter(3);
            break;
          case 'question4':
            setCounter(4);
            break;
          case 'question5':
            setCounter(5);
            break;
          case 'question6':
            setCounter(6);
            break;
          default:
            setCounter((c) => c + 1);
            break;
        }
      },
    };

  return (
    <OnboardingContext.Provider value={store}>
      <Button
        size="large"
        onClick={() => setModal(true)}
        title="sign into arcane platform"
        variant="primary"
        id="auth"
      >
        Learn more{' '}
        <img style={{ filter: 'invert(1)' }} src={arrow} alt="right arrow" />
      </Button>
      <Modal
        size="large"
        isOpen={isOpen()}
        toggleModal={setModal}
        class="onboarding-modal"
        icon={<img src={close} width={40} alt="modal close" />}
      >
        {/* <article class="modal-content">
          <div class="align-row gap-small modal-title">
            <img src={OnboardingLogo} alt="onboarding logo" />
            <p class="heading8">Investment Onboarding</p>
          </div>
          <div class="modal-form"></div>
        </article> */}
        <OnboardingForm />
      </Modal>
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
