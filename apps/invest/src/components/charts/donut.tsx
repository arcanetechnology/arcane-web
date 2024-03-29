/** @format */

import Chart from 'chart.js/auto/auto.mjs';
import { Card } from '@arcane-web/alchemy-solid';
import { VoidComponent, onMount } from 'solid-js';

type DoughnutData = {
  [key: string]: { value: number; color: string };
};

type DoughnutProps = {
  data: DoughnutData;
  title: string;
  value: string;
};

const Doughnut: VoidComponent<DoughnutProps> = (props) => {
  let canvas;

  onMount(() => {
    if (!canvas) return;
    const chart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: Object.keys(props.data),
        datasets: [
          {
            label: props.title,
            data: Object.keys(props.data).map((l) => props.data[l].value),
            backgroundColor: Object.keys(props.data).map(
              (l) => props.data[l].color
            ),
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
              pointStyle: 'circle',
              usePointStyle: true,
              generateLabels(chart) {
                const datasets = chart.data.datasets;
                return datasets[0].data.map((data, i) => ({
                  text: `${chart.data.labels[i]} (${data}%)`,
                  datasetIndex: i,
                  fillStyle: datasets[0].backgroundColor[i],
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
      /*   plugins: [
        {
          id: 'text',
          beforeDraw: function (chart) {
            const width = chart.width,
              height = chart.height,
              ctx = chart.ctx;
            ctx.restore();
            const fontSize = (height / 80).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.textBaseline = 'middle';

            const text = props.value,
              textX = Math.floor((width - ctx.measureText(text).width) / 3),
              textY = height / 1.75;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ], */
    });
    chart.update();
  });

  return (
    <Card class="w-full">
      <canvas
        ref={canvas}
        style={{
          'max-height': '200px',
        }}
      />
    </Card>
  );
};

export default Doughnut;

// TODO: move to arcane-charts
