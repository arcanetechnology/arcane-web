/** @format */

import { VoidComponent, For } from 'solid-js';
import { TextField, Form } from '@arcane-web/alchemy';
import { useOnboarding } from './Onboarding';

const OnboardingForm: VoidComponent = () => {
  const { countries } = useOnboarding();

  return (
    <Form>
      <TextField name="name" label="What is your name?" />
      <TextField
        name="inform"
        label="Inform us your companys name in case you are responding in their behalf"
      />
      <TextField list="countries" name="residence" label="residence" />
      <TextField name="number" label="number for future contact" />
      <datalist id="countries">
        <For each={countries}>
          {(country) => <option value={country.name} />}
        </For>
      </datalist>
    </Form>
  );
};

export default OnboardingForm;
