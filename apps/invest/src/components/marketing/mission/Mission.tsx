/** @format */

import type { VoidComponent } from 'solid-js';
import mission from '../../../assets/mission.png';
import './Mission.scss';

const Mission: VoidComponent = () => {
  return (
    <div class="container" data-auto-grid="2">
      <img width={600} src={mission} alt="contact us" />
      <div class="align-vertical">
        <h6 class="contact-marketing">
          The Arcane Asset Fund is an{' '}
          <span style={{ color: '#495057' }}>actively managed </span>fund with
          the mission of capturing the value of{' '}
          <span style={{ color: '#495057' }}>
            cryptocurrencies as an asset class
          </span>{' '}
          as a whole in the years ahead.
        </h6>
      </div>
    </div>
  );
};

export default Mission;
