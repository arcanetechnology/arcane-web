/** @format */

import { Button } from '@arcane-web/alchemy-solid';
import type { VoidComponent } from 'solid-js';
//import contact from '../../../assets/contact-us.png';
import contactPath from '../../../assets/contactUs.svg';
import './Contact.scss';

// A typical marketing component structure;
const Contact: VoidComponent = () => {
  return (
    <div class="container" data-auto-grid="2">
      <img src={contactPath} alt="contact us" />
      <div class="align-vertical">
        <h1>Contact Us</h1>
        <h6 class="contact-marketing">
          Get in touch to find out more about the fund and get the offering
          documentation.
        </h6>
        <div class="margin-top-32">
          <a href={`mailto:invest@arcane.no`}>
            <Button variant="primary" size="large">
              Email Us{' '}
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2.66309H2C0.895313 2.66309 0 3.5584 0 4.66309V12.6631C0 13.7678 0.895313 14.6631 2 14.6631H14C15.1047 14.6631 16 13.7678 16 12.6631V4.66309C16 3.5584 15.1031 2.66309 14 2.66309ZM2 4.16309H14C14.2757 4.16309 14.5 4.3874 14.5 4.66309V5.35559L9.2875 9.67121C8.56281 10.2737 7.43313 10.2734 6.71031 9.6717L1.5 5.35684V4.66309C1.5 4.38809 1.72438 4.16309 2 4.16309ZM14 13.1631H2C1.72431 13.1631 1.5 12.9388 1.5 12.6631V7.30996L5.75313 10.8537C6.38438 11.3756 7.18125 11.6631 8 11.6631C8.81875 11.6631 9.61719 11.376 10.2491 10.8512L14.5 7.30996V12.6631C14.5 12.9381 14.275 13.1631 14 13.1631Z"
                  fill="white"
                />
              </svg>
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
