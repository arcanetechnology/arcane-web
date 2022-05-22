/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, StepperForm } from '@arcane-web/alchemy';

const OnboardingForm: VoidComponent = () => {
  return (
    <StepperForm>
      <StepperForm.Tab>
        <TextField name="name" label="What is your name?" />
      </StepperForm.Tab>
      <StepperForm.Tab>
        <TextField
          name="inform"
          label="Inform us your companys name in case you are responding in their behalf"
        />
      </StepperForm.Tab>
      <StepperForm.Tab>
        <TextField list="countries" name="residence" label="residence" />
      </StepperForm.Tab>
      <StepperForm.Tab>
        <TextField name="number" label="number for future contact" />
      </StepperForm.Tab>
    </StepperForm>
  );
};

export default OnboardingForm;
