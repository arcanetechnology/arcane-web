/** @format */

import Chart from 'chart.js/auto';
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
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            display: true,
          },

          title: {
            display: true,
            text: props.title,
            position: 'left',
          },
          tooltip: {
            callbacks: {
              label: (ctx) => {
                return ctx.label + ' ' + ctx.formattedValue + '%';
              },
            },
          },
        },
        cutout: 120,
      },
      plugins: [
        {
          id: 'text',
          beforeDraw: function (chart) {
            const width = chart.width,
              height = chart.height,
              ctx = chart.ctx;
            ctx.restore();
            const fontSize = (height / 50).toFixed(2);
            ctx.font = fontSize + 'em sans-serif';
            ctx.textBaseline = 'middle';

            const text = props.value,
              textX = Math.floor((width - ctx.measureText(text).width) / 2.5),
              textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
          },
        },
      ],
    });
    chart.update();
  });

  return (
    <div class="space-8 radius-large align-center elevation-300">
      <canvas ref={canvas} />
    </div>
  );
};

export default Doughnut;
