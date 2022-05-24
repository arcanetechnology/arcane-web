/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, Stepper } from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';

const OnboardingForm: VoidComponent = () => {
  const { store } = useOnboarding();
  return (
    <Stepper>
      <Stepper.Tab>
        <OnboardingSurvey />
      </Stepper.Tab>
      <Stepper.Tab>
        <TextField name="name" label="What is your name?" />
      </Stepper.Tab>
      <Stepper.Tab>
        <TextField
          name="inform"
          label="Inform us your companys name in case you are responding in their behalf"
        />
      </Stepper.Tab>
      <Stepper.Tab>
        <TextField list="countries" name="residence" label="residence" />
      </Stepper.Tab>
      <Stepper.Tab>
        <TextField name="number" label="number for future contact" />
      </Stepper.Tab>
    </Stepper>
  );
};

export default OnboardingForm;
