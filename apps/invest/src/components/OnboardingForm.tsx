/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, Form, Button, useStepper } from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';

const OnboardingForm: VoidComponent = () => {
  const { store } = useOnboarding();

  const { step, next, previous, childElements } = useStepper(0);

  return (
    <Form id="onboardingForm" class="onboarding-form">
      <div
        class="onboarding-tabs"
        use:childElements={(e) => {
          console.log('');
        }}
      >
        <div>
          <OnboardingSurvey />
        </div>
        <div>
          <TextField name="name" label="What is your name?" />
        </div>
        <div>
          <TextField
            name="inform"
            label="Inform us your companys name in case you are responding in their behalf"
          />
        </div>
        <div>
          <TextField list="countries" name="residence" label="residence" />
        </div>
        <div>
          <TextField name="number" label="number for future contact" />
        </div>
      </div>
      <div class="onboarding-actions align-row">
        <Button onClick={previous} type="button">
          Back
        </Button>
        <div style="flex-grow: 1;"></div>
        <Button id="onboardingForm" type="submit">
          Submit
        </Button>
        <Button onClick={next} type="button">
          Next
        </Button>
      </div>
    </Form>
  );
};

export default OnboardingForm;
