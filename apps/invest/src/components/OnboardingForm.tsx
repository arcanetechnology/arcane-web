/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, Stepper } from '@arcane-web/alchemy';

const OnboardingForm: VoidComponent = () => {
  return (
    <Stepper>
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
      <Stepper.Actions>
        <button>next</button>
      </Stepper.Actions>
    </Stepper>
  );
};

export default OnboardingForm;
