/** @format */
import { Show, For, Match, Switch, createSignal, createEffect } from 'solid-js';
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
import back from '../../../assets/back.svg';
import './CustomerForm.scss';
import Progress from '../../progress/Progress';

const coutryObject = createOptions(countries as Countries, {
  key: 'displayName',
});

const CustomerFormPages = formConfig.map(
  (field) => (props: OnboardingFormPages) => {
    const [progress, setProgress] = createSignal(0);
    const [showCountryCode, setCountryCode] = createSignal(false);
    const { form, data, setFields, handleSubmit } = createForm({
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

    createEffect(() => {
      setProgress(
        Math.trunc(((props.progress + 7) / (props.totalPages + 7)) * 100)
      );
    });

    return (
      <Form ref={form} class="onboarding-content customer-node">
        <div class="onboarding-main">
          <FieldSet class="padding-16">
            <Label for={field.name}>
              <p class="heading8">{field.label}</p>
            </Label>
            <br />
            <Switch
              fallback={
                <div class="w-full align-horizontal gap-small">
                  <Input
                    name={field.name}
                    placeholder={field.initialValue}
                    id={field.name}
                    type={field.name === 'nationalNumber' ? 'tel' : 'text'}
                    list={field.name}
                  />
                  <Button
                    onClick={handleSubmit}
                    variant="secondary"
                    size="medium"
                    type="button"
                  >
                    OK
                  </Button>
                </div>
              }
            >
              <Match when={field.name === 'countryCode'}>
                <div class="w-full align-horizontal gap-small">
                  <Select
                    class="custom w-full"
                    {...coutryObject}
                    id={field.name}
                    name={field.name}
                    initialValue={data(($data) => $data.countryCode)}
                    onChange={(selected) => {
                      setFields({
                        countryCode: selected.displayName,
                      });
                    }}
                  />
                  <Button
                    onClick={handleSubmit}
                    variant="secondary"
                    size="medium"
                    type="button"
                  >
                    OK
                  </Button>
                </div>
              </Match>
              <Match when={field.name === 'companyBehalf'}>
                <>
                  <Button
                    onClick={() => props.onSubmit({ [field.name]: 'yes' })}
                    variant="secondary"
                    type="button"
                    size="medium"
                  >
                    Yes
                  </Button>
                  <br />
                  <Button
                    onClick={() => props.onSubmit({ [field.name]: 'no' })}
                    variant="secondary"
                    size="medium"
                    type="button"
                  >
                    No
                  </Button>
                </>
              </Match>
              <Match when={field.name === 'nationalNumber'}>
                <div class="w-full align-horizontal gap-small">
                  <div style={{ flex: '1' }}>
                    <Select
                      class="custom"
                      {...coutryObject}
                      name="countryCode"
                      id="countryCode"
                      onBlur={() => {
                        setCountryCode(true);
                      }}
                      placeholder="Country Code"
                      initialValue={data(($data) => $data.countryCode)}
                      onChange={(selected) => {
                        setFields({
                          countryCode: selected.displayName,
                        });
                      }}
                    />
                  </div>
                  {showCountryCode() && (
                    <p>
                      +{' '}
                      {
                        countries.find(
                          (c: Country) =>
                            c.displayName === data(($data) => $data.countryCode)
                        ).callingCountryCode
                      }
                    </p>
                  )}

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
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() =>
                      props.onSubmit({
                        countryCode: countries
                          .find(
                            (c: Country) =>
                              c.displayName ===
                              data(($data) => $data.countryCode)
                          )
                          .callingCountryCode.toString(),
                        nationalNumber: data(($data) => $data.nationalNumber),
                      })
                    }
                    id="national-number-button"
                    size="medium"
                  >
                    OK
                  </Button>
                </div>
              </Match>
            </Switch>
          </FieldSet>
        </div>
        <div class="onboarding-footer modal-horizontal">
          <div style={{ 'padding-right': '8px' }}>
            <Progress
              label={`${progress()}% Completed`}
              max="100"
              value={`${progress()}`}
              id="customer-form-progress"
            />
          </div>
          <Button
            variant="primary"
            size="medium"
            onClick={() => {
              props.onBack(data);
            }}
            type="button"
          >
            <img width={15} src={back} style={{ filter: 'invert(1)' }} />
            Back
          </Button>
        </div>
      </Form>
    );
  }
);

export default CustomerFormPages;
