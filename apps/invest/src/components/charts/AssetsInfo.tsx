/** @format */

import { createEffect, createSignal, on, VoidComponent } from 'solid-js';
import Chart from 'chart.js/auto/auto.esm';
import { Card } from '@arcane-web/alchemy-solid';
import { onMount } from 'solid-js';
import { Assets } from '../../invest.types';

type AssetInfoProps = {
  data: Assets;
  title: string;
};

const AssetInfo: VoidComponent<AssetInfoProps> = (props) => {
  const [sum, setSum] = createSignal<number | null>(null);
  let canvas;

  onMount(() => {
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
              data: props.data.map((item) => (item.units / sum) * 100),
              backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(255, 123, 86)',
              ],
            },
          ],
        },
        options: {
          responsive: true,
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
          'min-width': '400px',
        }}
      />
    </Card>
  );
};

export default AssetInfo;
