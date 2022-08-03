/** @format */

import type { VoidComponent } from 'solid-js';
import './Progress.scss';

type ProgressProps = {
  value: string;
  id: string;
  max: string;
  label: string;
};

const Progress: VoidComponent<ProgressProps> = (props) => {
  return (
    <div class="arcane-progress">
      <label for={props.id}>{props.label}</label>
      <progress id={props.id} max={props.max} value={props.value} />
    </div>
  );
};
export default Progress;
