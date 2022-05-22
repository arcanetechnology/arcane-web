/** @format */

import { ParentComponent } from 'solid-js';
import { Form } from '../../components';

const StepperForm: ParentComponent = (props) => {
  return (
    <Form id="stepperForm">
      <div class="tab">
        Name:
        <p>
          <input placeholder="First name..." />
        </p>
        <p>
          <input placeholder="Last name..." />
        </p>
      </div>

      <div class="tab">
        Contact Info:
        <p>
          <input placeholder="E-mail..." />
        </p>
        <p>
          <input placeholder="Phone..." />
        </p>
      </div>

      <div class="tab">
        Birthday:
        <p>
          <input placeholder="dd" />
        </p>
        <p>
          <input placeholder="mm" />
        </p>
        <p>
          <input placeholder="yyyy" />
        </p>
      </div>

      <div class="tab">
        Login Info:
        <p>
          <input placeholder="Username..." />
        </p>
        <p>
          <input placeholder="Password..." />
        </p>
      </div>

      <div style="overflow:auto;">
        <div style="float:right;">
          <button type="button" id="prevBtn">
            Previous
          </button>
          <button type="button" id="nextBtn">
            Next
          </button>
        </div>
      </div>
      <div style="text-align:center;margin-top:40px;">
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
        <span class="step"></span>
      </div>
    </Form>
  );
};

export default StepperForm;
