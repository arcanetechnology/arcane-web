/** @format */

import {
  Form,
  FieldSet,
  RadioButton,
  Label,
  Input,
  Button,
} from '@arcane-web/alchemy';
import { createForm } from '@felte/solid';
import type { Customer } from './customer.types';
import { schema, initialValue } from './customer.types';
import { validator } from '@felte/validator-zod';
import reporter from '@felte/reporter-tippy';
import type { OnboardingFormPages } from '../Onboarding.types';

const CustomerFormPages = Object.keys(initialValue).map(
  (field) => (props: OnboardingFormPages) => {
    const { form, data } = createForm<Customer>({
      onSubmit: props.onSubmit,
      extend: [
        validator({ schema: schema }),
        reporter({
          tippyProps: {
            animation: 'shift-away-extreme',
          },
        }),
      ],
    });
    return (
      <Form ref={form}>
        <FieldSet>
          <Label>
            <h4>Are you making this request on your company’s behalf ?</h4>
          </Label>
          <div class="padding-16">
            <RadioButton
              position="down"
              id="company-behalf"
              name={field}
              label="Yes"
              value="yes"
            />
            <br />
            <RadioButton
              position="down"
              id="company-behalf"
              name={field}
              label="No"
              value={'no'}
            />
          </div>
        </FieldSet>
        <Button type="button" onClick={() => props.onBack(data)}>
          Back
        </Button>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
);

export default CustomerFormPages;
