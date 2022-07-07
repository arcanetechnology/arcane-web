/** @format */
import { Show, For, Match, Switch } from 'solid-js';
import {
  Form,
  FieldSet,
  RadioButton,
  Label,
  Input,
  Button,
} from '@arcane-web/alchemy-solid';
import { createForm } from '@felte/solid';

import { formConfig } from './customer.types';
import { validator } from '@felte/validator-zod';
import reporter from '@felte/reporter-tippy';
import type { OnboardingFormPages } from '../Onboarding.types';
import countries from '../../../assets/countries.json';

/* const countryCode: Countries = [
  ...new Set([].concat(...countries.map((c) => c))),
]; */

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
            <Label for={field.name}>
              <p class="heading8">{field.label}</p>
            </Label>
            <Switch
              fallback={
                <Input
                  class="w-full"
                  name={field.name}
                  placeholder={field.initialValue}
                  id={field.name}
                  type={field.name === 'phoneNumber' ? 'tel' : 'text'}
                  list={field.name}
                />
              }
            >
              <Match when={field.name === 'residence'}>
                <>
                  <datalist id={field.name}>
                    <For each={countries}>
                      {(country) => (
                        <option
                          value={`${country[0].flag} - ${country[0].name}`}
                        />
                      )}
                    </For>
                  </datalist>
                  <Input
                    class="w-full"
                    name={field.name}
                    placeholder={field.initialValue}
                    id={field.name}
                    type="text"
                    list={field.name}
                  />
                </>
              </Match>
              <Match when={field.name === 'phoneNumber'}>
                <>
                  <div class="align-row gap-small w-full">
                    <select
                      style={{
                        flex: 1,
                      }}
                      class="radius-small padding-4"
                      name="code"
                      id="code"
                    >
                      <For
                        each={[
                          ...new Set([].concat(...countries.map((c) => c))),
                        ]}
                      >
                        {(code) => (
                          <option
                            value={code.countryCode}
                          >{`${code.flag} ${code.countryCode}`}</option>
                        )}
                      </For>
                    </select>
                    <Input
                      style={{
                        flex: 2,
                      }}
                      name={field.name}
                      placeholder="Phone Number"
                      id={field.name}
                      type={field.name === 'phoneNumber' ? 'tel' : 'text'}
                      list={field.name}
                    />
                  </div>
                </>
              </Match>
              <Match when={field.name === 'companyBehalf'}>
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
                    id={field.name + 'no'}
                    name={field.name}
                    label="No"
                    value={'no'}
                  />
                </>
              </Match>
            </Switch>
          </FieldSet>
        </div>
        <div class="align-row w-full">
          <Button type="button" onClick={() => props.onBack(data)}>
            Back
          </Button>
          <div style={{ 'flex-grow': 1 }} />
          <Show
            when={field.name === 'phoneNumber'}
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
