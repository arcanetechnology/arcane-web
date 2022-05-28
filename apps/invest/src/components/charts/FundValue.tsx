/** @format */
import Chart from 'chart.js/auto';
import { onMount, VoidComponent } from 'solid-js';

type FundValueProps = {
  highest: string;
  lowest: string;
  performance: string;
  rate: string;
};

const FundValue: VoidComponent<FundValueProps> = (props) => {
  let canvas;
  return (
    <div>
      <canvas ref={canvas} />
    </div>
  );
};

export default FundValue;
