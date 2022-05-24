/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, Stepper, Button } from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';

const OnboardingForm: VoidComponent = () => {
  const { store } = useOnboarding();

  return (
    <Stepper
      id="onboarding-form"
      method="post"
      onSubmit={(e) => {
        e.preventDefault();
        console.log(e.target);
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
    </Stepper>
  );
};

export default OnboardingForm;
