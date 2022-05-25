/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, Form, Button, useStepper } from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';

const OnboardingForm: VoidComponent = () => {
  const { store } = useOnboarding();
  const [question] = store;

  const { step, next, previous, childElements, getLast } = useStepper(0);

  const handleNextWithSurvey = () => {
    if (question() === 'pro.4') {
      next();
    }
  };

  return (
    <Form id="onboardingForm" class="onboarding-form">
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
      <div class="onboarding-actions align-row">
        <Button hidden={step() === 0} onClick={previous} type="button">
          Back
        </Button>
        <div
          style={{
            'flex-grow': 1,
          }}
        ></div>
        <Button hidden={!getLast()} id="onboardingForm" type="submit">
          Submit
        </Button>
        <Button
          disabled={!(question() === 'pro.4')}
          hidden={getLast()}
          onClick={handleNextWithSurvey}
          type="button"
        >
          Next
        </Button>
      </div>
    </Form>
  );
};

export default OnboardingForm;
