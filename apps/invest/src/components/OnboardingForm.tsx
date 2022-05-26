/** @format */

import { createSignal, VoidComponent } from 'solid-js';
import {
  TextField,
  Form,
  Button,
  useStepper,
  Modal,
} from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';

const OnboardingForm: VoidComponent = () => {
  const { store } = useOnboarding();
  const [isOpen, setModal] = createSignal<boolean>(false);
  const [question] = store;
  const { step, next, previous, childElements, getLast } = useStepper(0);

  const handleNextWithSurvey = () => {
    if (question() === 'pro.4') {
      next();
    }
  };

  return (
    <Form
      onChange={(e) => {
        if (e.target.getAttribute('name') === 'dynamic-onboarding') {
          //TODO: store it and then send it on next.
          console.log(e.target.getAttribute('value'));
        }
      }}
      id="onboardingForm"
    >
      <Button type="button" onClick={() => setModal(true)}>
        open modal
      </Button>
      <Modal isOpen={isOpen()}>
        <Modal.Title toggleModal={setModal}>
          <h3>Investment Onboarding</h3>
        </Modal.Title>
        <Modal.Content toggleModal={setModal}>
          <div
            class="onboarding-tabs"
            use:childElements={(e) => {
              console.log('');
            }}
          >
            <div class="onboarding-tab">
              <OnboardingSurvey />
            </div>
            <div class="onboarding-tab">
              <TextField name="name" label="What is your name?" />
            </div>
            <div class="onboarding-tab">
              <TextField
                name="inform"
                label="Inform us your companys name in case you are responding in their behalf"
              />
            </div>
            <div class="onboarding-tab">
              <TextField list="countries" name="residence" label="residence" />
            </div>
            <div class="onboarding-tab">
              <TextField name="number" label="number for future contact" />
            </div>
          </div>
        </Modal.Content>
        <Modal.Action toggleModal={setModal}>
          <Button
            variant="secondary"
            hidden={step() === 0}
            onClick={previous}
            type="button"
          >
            Back
          </Button>
          <div
            style={{
              'flex-grow': 1,
            }}
          ></div>
          <Button
            variant="primary"
            hidden={!getLast()}
            id="onboardingForm"
            type="submit"
          >
            Submit
          </Button>
          <Button
            disabled={!(question() === 'pro.4')}
            hidden={getLast()}
            onClick={handleNextWithSurvey}
            type="button"
            variant="primary"
          >
            Next
          </Button>
        </Modal.Action>
      </Modal>
    </Form>
  );
};

export default OnboardingForm;
