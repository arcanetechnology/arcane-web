/** @format */
import Chart from 'chart.js/auto/auto.esm';
import { onMount, VoidComponent } from 'solid-js';
import { Card } from '@arcane-web/alchemy-solid';

type DataSet = {
  label: string;
  data: Array<number>;
};

type FundValueProps = {
  labels: Array<string>;
  datasets: Array<DataSet>;
  max: number;
  title: string;
};

// TODO: add max and min value
const FundValue: VoidComponent<FundValueProps> = (props) => {
  let canvas;
  onMount(() => {
    if (!canvas) return;
    const chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: props.labels,
        datasets: props.datasets.map((data, index) => ({
          label: data.label,
          data: data.data,
          lineTension: 0.4,
          borderWidth: 2,
          ...(index > 0 && {
            borderDash: [5, 4],
            fill: false,
            borderColor: '#AEAEB2',
          }),
          ...(index === 0 && {
            borderColor: '#000000',
            fill: {
              target: 'origin',
              above: 'rgb(142, 142, 147,0.2)',
            },
          }),
        })),
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: props.title,
            position: 'top',
            align: 'start',
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            max: props.max,
          },
        },
      },
    });
    chart.update();
  });
  return (
    <Card class="align-center">
      <canvas ref={canvas} />
    </Card>
  );
};

export default FundValue;
