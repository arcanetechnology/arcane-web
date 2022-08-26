/** @format */

import type { VoidComponent } from 'solid-js';
import './Mission.scss';
import SolidRichText from 'rich-text-solid-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

type MissionProps = {
  url: string;
  description: any;
};

const options = {
  renderMark: {
    [MARKS.BOLD]: (props) => (
      <span style={{ color: '#495057' }}>{props.children}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (props) => {
      return <p class="small">{props.children}</p>;
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
        <SolidRichText document={props.description} options={options} />
      </div>
    </div>
  );
};

export default Mission;
