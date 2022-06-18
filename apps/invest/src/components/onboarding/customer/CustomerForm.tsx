/** @format */
import { Show } from 'solid-js';
import {
  Form,
  FieldSet,
  RadioButton,
  Label,
  Input,
  Button,
} from '@arcane-web/alchemy';
import { createForm } from '@felte/solid';

import { formConfig } from './customer.types';
import { validator } from '@felte/validator-zod';
import reporter from '@felte/reporter-tippy';
import type { OnboardingFormPages } from '../Onboarding.types';

const CustomerFormPages = formConfig.map(
  (field) => (props: OnboardingFormPages) => {
    const { form, data } = createForm({
      onSubmit: props.onSubmit,
      extend: [
        validator({ schema: field.validation, level: 'error' }),
        reporter({
          tippyProps: {
            animation: 'shift-away-extreme',
          },
        }),
      ],
    });
    return (
      <Form
        ref={form}
        class="w-full"
        style={{
          display: 'grid',
          'grid-template-rows': '90% 10%',
          height: '100%',
          overflow: 'scroll',
        }}
      >
        <div>
          <FieldSet>
            <Label>
              <h4>{field.label}</h4>
            </Label>
            <Show
              when={!(field.name === 'companyBehalf')}
              fallback={
                <>
                  <RadioButton
                    position="down"
                    id={field.name}
                    name={field.name}
                    label="Yes"
                    value="yes"
                  />
                  <br />
                  <RadioButton
                    position="down"
                    id={field.name}
                    name={field.name}
                    label="No"
                    value={'no'}
                  />
                </>
              }
            >
              <Input
                class="w-full"
                name={field.name}
                placeholder={field.initialValue}
                id={field.name}
              />
            </Show>
          </FieldSet>
        </div>
        <div class="align-row w-full">
          <Button type="button" onClick={() => props.onBack(data)}>
            Back
          </Button>
          <div style="flex-grow: 1;"></div>
          <Show
            when={field.name === 'number'}
            fallback={<Button variant="primary">Next</Button>}
          >
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Show>
        </div>
      </Form>
    );
  }
);

export default CustomerFormPages;
