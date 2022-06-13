/** @format */

import { createEffect, createSignal, VoidComponent } from 'solid-js';
import {
  Form,
  Button,
  useStepper,
  Modal,
  FieldSet,
  RadioButton,
  Label,
  Input,
  useForm,
} from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';
import { Answers } from '../../config/onboarding';

const OnboardingForm: VoidComponent = () => {
  const [form, actions] = useOnboarding();
  const [isOpen, setModal] = createSignal<boolean>(false);
  const { step, next, previous, childElements, getLast } = useStepper(0);
  const { errors, resetError, validate, formSubmit } = useForm({
    errorClass: '',
    onSubmit: (e) => {
      console.log(e);
    },
  });

  // TODO: USE SOLID-JS FIREBASE TO OPEN THE FORM.

  createEffect(() => {
    console.log(errors);
  });

  return (
    <Form
      onChange={(e) => {
        if (e.target.getAttribute('name') === 'dynamic-onboarding') {
          actions.setAnswer(e.target.getAttribute('value') as Answers);
        }
      }}
      onSubmit={formSubmit}
      id="onboardingForm"
    >
      <Button type="button" variant="primary" onClick={() => setModal(true)}>
        Contact Us
      </Button>
      <Modal isOpen={isOpen()}>
        <Modal.Title toggleModal={setModal}>
          <h3>Investment Onboarding</h3>
        </Modal.Title>
        <Modal.Content toggleModal={setModal}>
          <div use:childElements={() => null}>
            <div class="onboarding-tab">
              <h4>
                Thanks for your insterest in our fund. Before we proceed, we
                will ask you some questions that will help customize this
                solution to meet your own needs.
              </h4>
            </div>
            <div class="onboarding-tab">
              <OnboardingSurvey />
            </div>
            <div class="onboarding-tab">
              <FieldSet>
                <Label for="company-behalf">
                  <h4>
                    Are you making this request on your company’s behalf ?
                  </h4>
                </Label>
                <div class="padding-16">
                  <RadioButton
                    position="down"
                    id="company-behalf"
                    name=""
                    label="Yes"
                    value="yes"
                  />
                  <br />
                  <RadioButton
                    position="down"
                    id="company-behalf"
                    name=""
                    label="No"
                    value={'no'}
                  />
                </div>
              </FieldSet>
            </div>
            <div class="onboarding-tab">
              <FieldSet>
                <Label for="name">
                  <h4>What is your name?</h4>
                </Label>
                <div class="padding-16">
                  <Input class="w-full" name="name" />
                </div>
              </FieldSet>
            </div>
            <div class="onboarding-tab">
              <FieldSet>
                <Label for="company">
                  <h4>What is your company's name? </h4>
                </Label>
                <div class="padding-16">
                  <Input class="w-full" name="company" />
                </div>
              </FieldSet>
            </div>
            <div class="onboarding-tab">
              <FieldSet>
                <Label for="residence">
                  <h4>What is the country of your residence?</h4>
                </Label>
                <div class="padding-16">
                  <Input class="w-full" list="countries" name="residence" />
                </div>
              </FieldSet>
            </div>
            <div class="onboarding-tab">
              <FieldSet>
                <Label for="number">
                  <h4>Could you inform a number for future contact?</h4>
                </Label>
                <div class="padding-16">
                  <Input
                    onBlur={(e) => console.log('validate' + e.target.localName)}
                    onFocusOut={(e) =>
                      console.log('reset validate' + e.target.localName)
                    }
                    class="w-full"
                    list="number"
                    name="residence"
                  />
                </div>
              </FieldSet>
            </div>
          </div>
        </Modal.Content>
        <Modal.Action toggleModal={setModal}>
          <Button
            variant="tertiary"
            hidden={step() === 0}
            onClick={previous}
            type="button"
          >
            Back
          </Button>
          <div
            style={{
              'flex-grow': 1,
            }}
          ></div>
          <Button
            variant="primary"
            hidden={!getLast()}
            id="onboardingForm"
            type="submit"
          >
            Submit
          </Button>
          <Button
            hidden={step() > 0}
            onClick={next}
            class="w-full"
            type="button"
            variant="primary"
          >
            Start
          </Button>
          <Button
            disabled={form.disable}
            hidden={getLast() || step() === 0}
            onClick={() => {
              if (form.route === 'pro.4') {
                next();
              } else {
                actions.setRoute();
              }
            }}
            type="button"
            variant="primary"
          >
            Next
          </Button>
        </Modal.Action>
      </Modal>
    </Form>
  );
};

export default OnboardingForm;

//TODO: add full-width capability in input not text-field
