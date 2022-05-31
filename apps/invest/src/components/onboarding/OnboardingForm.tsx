/** @format */

import { createSignal, VoidComponent } from 'solid-js';
import {
  Form,
  Button,
  useStepper,
  Modal,
  FieldSet,
  RadioButton,
  Label,
  Input,
} from '@arcane-web/alchemy';
import OnboardingSurvey from './OnboardingSurvey';
import { useOnboarding } from './Onboarding';
import { Answers } from '../../config/onboarding';

const OnboardingForm: VoidComponent = () => {
  const [form, actions] = useOnboarding();
  const [isOpen, setModal] = createSignal<boolean>(false);
  const { next, previous, childElements, getLast } = useStepper(0);

  return (
    <Form
      onChange={(e) => {
        if (e.target.getAttribute('name') === 'dynamic-onboarding') {
          actions.setAnswer(e.target.getAttribute('value') as Answers);
        }
      }}
      id="onboardingForm"
    >
      <Button type="button" onClick={() => setModal(true)}>
        <span>open modal</span>
      </Button>
      <Modal isOpen={isOpen()}>
        <Modal.Title toggleModal={setModal}>
          <h3>Investment Onboarding</h3>
        </Modal.Title>
        <Modal.Content toggleModal={setModal}>
          <div
            use:childElements={(e) => {
              console.log('');
            }}
          >
            <div class="onboarding-tab">
              <OnboardingSurvey />
            </div>
            <div class="onboarding-tab">
              <FieldSet class="padding-16">
                <Label for="company-behalf">
                  <h4>
                    Are you making this request on your company’s behalf ?
                  </h4>
                </Label>
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
                  <Input class="w-full" list="number" name="residence" />
                </div>
              </FieldSet>
            </div>
          </div>
        </Modal.Content>
        <Modal.Action toggleModal={setModal}>
          <Button
            variant="tertiary"
            hidden={form.route === 'intro'}
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
            disabled={form.disable}
            hidden={getLast()}
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
