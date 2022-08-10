/** @format */

import { createEffect, createSignal, on, VoidComponent } from 'solid-js';
import Chart from 'chart.js/auto/auto.mjs';
import { Card } from '@arcane-web/alchemy-solid';
import { onMount } from 'solid-js';
import { Assets } from '../../invest.types';

type AssetInfoProps = {
  data: Assets;
  title: string;
};
const backgroundColor = [
  '#5ac8fa',
  '#5856d6',
  '#aeaeb2',
  '#fa8f5a',
  '#d69656',
  '#b2b0ae',
  '#090A0B',
];

const AssetInfo: VoidComponent<AssetInfoProps> = (props) => {
  const [sum, setSum] = createSignal<number | null>(null);
  let canvas;

  createEffect(() => {
    setSum(props.data.map((item) => item.units).reduce((a, b) => a + b));
  });

  createEffect(
    on(sum, (sum) => {
      if (!canvas || !sum) return;
      const chart = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: props.data.map((item) => item.name),
          datasets: [
            {
              label: props.title,
              data: props.data.map((item) => {
                const perc = Math.trunc((item.units / sum) * 10000) / 100;
                return perc;
              }),
              backgroundColor: backgroundColor,
            },
          ],
        },
        options: {
          responsive: true,
          cutout: 60,
          plugins: {
            legend: {
              position: 'right',
              display: true,
              labels: {
                generateLabels(chart) {
                  const datasets = chart.data.datasets;
                  return datasets[0].data.map((data, i) => ({
                    text: `${chart.data.labels[i]} (${data}%)`,
                    datasetIndex: i,
                    hidden: false,
                    fillStyle: datasets[0].backgroundColor[i],
                    textAlign: 'left',
                  }));
                },
              },
            },

            title: {
              display: true,
              text: props.title,
              position: 'top',
              align: 'start',
              font: {
                family: 'Poppins',
                size: 16,
                lineHeight: '24px',
                weight: '500',
                style: 'normal',
              },
            },
            tooltip: {
              callbacks: {
                label: (ctx) => {
                  return ctx.label + ' ' + ctx.formattedValue + '%';
                },
              },
            },
          },
        },
      });
      chart.update();
    })
  );

  return (
    <Card class="w-full">
      <canvas
        ref={canvas}
        style={{
          'max-height': '200px',
          width: '100%',
          'object-fit': 'contain',
        }}
      />
    </Card>
  );
};

export default AssetInfo;
