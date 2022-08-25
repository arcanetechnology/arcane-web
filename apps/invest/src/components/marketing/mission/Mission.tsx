/** @format */

import type { VoidComponent } from 'solid-js';
import './Mission.scss';
import SolidRichText from 'rich-text-solid-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

type MissionProps = {
  url: string;
  description: any;
};

const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (props) => {
      return (
        <>
          <br />
          <p class="small">{props.children}</p>
        </>
      );
    },

    [BLOCKS.HEADING_6]: (props) => {
      return <h6 class="contact-marketing">{props.children}</h6>;
    },
  },
};

const Mission: VoidComponent<MissionProps> = (props) => {
  return (
    <div class="container" data-auto-grid="2">
      <img width={600} src={props.url} alt="mission" />
      <div class="align-vertical">
        {/* <h6 class="contact-marketing">
          The Arcane Assets Fund is an{' '}
          <span style={{ color: '#495057' }}>actively managed </span>fund with
          the mission of capturing the value of{' '}
          <span style={{ color: '#495057' }}>
            cryptocurrencies as an asset class
          </span>{' '}
          as a whole in the years ahead.
        </h6> */}
        <SolidRichText document={props.description} options={options} />
      </div>
    </div>
  );
};

export default Mission;
