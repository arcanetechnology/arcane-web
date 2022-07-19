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
import type { Countries, Country } from '../../../invest.types';
import { createOptions, Select } from '@thisbeyond/solid-select';
import '@thisbeyond/solid-select/style.css';
import './CustomerForm.scss';

const coutryObject = createOptions(countries, { key: 'name' });

const CustomerFormPages = formConfig.map(
  (field) => (props: OnboardingFormPages) => {
    const { form, data, setFields } = createForm({
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
                  type={field.name === 'nationalNumber' ? 'tel' : 'text'}
                  list={field.name}
                />
              }
            >
              <Match when={field.name === 'countryCode'}>
                <>
                  <Select
                    class="custom"
                    {...coutryObject}
                    id={field.name}
                    name={field.name}
                    initialValue={data(($data) => $data.countryCode)}
                    onChange={(selected) => {
                      setFields({ countryCode: selected.name });
                    }}
                  />
                </>
              </Match>
              <Match when={field.name === 'nationalNumber'}>
                <>
                  <div class="align-row gap-small w-full">
                    <select
                      style={{
                        flex: 1,
                      }}
                      class="radius-small padding-4"
                      name="countryCode"
                      id="countryCode"
                    >
                      <For each={countries as Countries}>
                        {(c) => (
                          <option
                            value={c.countryCode}
                          >{`${c.countryCode} ${c.flag}`}</option>
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
            when={field.name === 'nationalNumber'}
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
