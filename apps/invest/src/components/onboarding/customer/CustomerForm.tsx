/** @format */
import {
  Show,
  For,
  Match,
  Switch,
  createSignal,
  createEffect,
  onMount,
} from 'solid-js';
import {
  Form,
  FieldSet,
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
import { isSmall } from '../..';
import OnboardingLogo from '../../../assets/onboarding.svg';

const coutryObject = createOptions(countries as Countries, {
  key: 'displayName',
});

const CustomerFormPages = formConfig.map(
  (field) => (props: OnboardingFormPages) => {
    const [progress, setProgress] = createSignal(0);
    const [showCountryCode, setCountryCode] = createSignal<string | number>('');
    const { form, data, setFields, setData } = createForm({
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
      if (field.name === 'nationalNumber') {
        props.formData.some((o) => {
          if (o !== undefined) {
            if (o.hasOwnProperty('countryCode')) {
              const country = countries.find(
                (c) => c.isO3CountyCode === o['countryCode']
              );

              setFields({ countryCode: country.displayName });
              setCountryCode(country.callingCountryCode);
            }
          }
        });
      }
    });

    createEffect(() => {
      setProgress(
        Math.trunc(((props.progress + 7) / (props.totalPages + 7)) * 100)
      );
    });

    return (
      <div class="onboarding-form">
        <div class="onboarding-form-title">
          <img src={OnboardingLogo} alt="onboarding logo" />
          <p class="body1">Investment Onboarding</p>
        </div>
        <Form style={{ width: '100%' }} ref={form}>
          <div class="onboarding-form-content">
            <div>
              <Label for={field.name}>
                <p class="heading8">{field.label}</p>
              </Label>
              <Switch
                fallback={
                  <div class="onboarding-form-input">
                    <Input
                      name={field.name}
                      placeholder={field.initialValue}
                      id={field.name}
                      type={field.name === 'nationalNumber' ? 'tel' : 'text'}
                      list={field.name}
                    />
                    <Button
                      style={{ width: '49px' }}
                      variant="secondary"
                      size="medium"
                      type="submit"
                    >
                      OK
                    </Button>
                  </div>
                }
              >
                <Match when={field.name === 'countryCode'}>
                  <div class="onboarding-form-input">
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
                      style={{ width: '49px' }}
                      onClick={() =>
                        props.onSubmit({
                          countryCode: countries
                            .find(
                              (c: Country) =>
                                c.displayName ===
                                data(($data) => $data.countryCode)
                            )
                            .isO3CountyCode.toString(),
                        })
                      }
                      variant="secondary"
                      size="medium"
                      type="button"
                    >
                      OK
                    </Button>
                  </div>
                </Match>
                <Match when={field.name === 'companyBehalf'}>
                  <div class="onboarding-company-behalf">
                    <Button
                      onClick={() => props.onSubmit({ [field.name]: 'yes' })}
                      variant="secondary"
                      type="button"
                      size="medium"
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => props.onSubmit({ [field.name]: 'no' })}
                      variant="secondary"
                      size="medium"
                      type="button"
                    >
                      No
                    </Button>
                  </div>
                </Match>
                <Match when={field.name === 'nationalNumber'}>
                  <div
                    class="onboarding-form-input"
                    classList={{
                      'align-vertical': isSmall(),
                    }}
                  >
                    <div>
                      <Select
                        class="number-list"
                        {...coutryObject}
                        name="countryCode"
                        id="countryCode"
                        emptyPlaceholder={''}
                        placeholder={''}
                        initialValue={data(($data) => $data.countryCode)}
                        onChange={(selected) => {
                          setCountryCode(
                            countries.find(
                              (c: Country) =>
                                c.displayName === selected.displayName
                            ).callingCountryCode
                          );
                          setFields({
                            countryCode: selected.displayName,
                          });
                        }}
                      />
                    </div>
                    <p>+ {showCountryCode()}</p>
                    <div
                      style={{
                        flex: 1,
                      }}
                      classList={{
                        'padding-4': isSmall(),
                        'w-full': isSmall(),
                      }}
                    >
                      <Input
                        name={field.name}
                        placeholder="Phone Number"
                        id={field.name}
                        type={field.name === 'phoneNumber' ? 'tel' : 'text'}
                        list={field.name}
                      />
                    </div>
                    <Button
                      type="button"
                      style={{ width: '49px' }}
                      variant="secondary"
                      onClick={() =>
                        props.onSubmit({
                          phoneNumber: {
                            countryCode: showCountryCode(),
                            nationalNumber: data(
                              ($data) => $data.nationalNumber
                            ),
                          },
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
            </div>
          </div>
          <div class="onboarding-form-footer">
            <div>
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
                props.onBack(data());
              }}
              type="button"
            >
              <img width={15} src={back} style={{ filter: 'invert(1)' }} />
              Back
            </Button>
          </div>
        </Form>
      </div>
    );
  }
);

export default CustomerFormPages;
