/** @format */

import { VoidComponent } from 'solid-js';
import { TextField, Form } from '@arcane-web/alchemy';

const OnboardingForm: VoidComponent = () => {
  return (
    <Form>
      <TextField name="name" label="What is your name?" />
      <TextField
        name="inform"
        label="Inform us your companys name in case you are responding in their behalf"
      />
      <TextField list="countries" name="residence" label="residence" />
      <TextField name="number" label="number for future contact" />
    </Form>
  );
};

export default OnboardingForm;
