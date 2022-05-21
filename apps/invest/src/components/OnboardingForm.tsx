/** @format */

import { VoidComponent } from 'solid-js';
import { TextField } from '@arcane-web/alchemy';

const OnboardingForm: VoidComponent = (props) => {
  return (
    <form>
      <TextField name="name" label="What is your name?" />
      <TextField
        name="inform"
        label="Inform us your companys name in case you are responding in their behalf"
      />
      <TextField name="residence" label="residence" />
      <TextField name="number" label="number for future contact" />
    </form>
  );
};

export default OnboardingForm;
