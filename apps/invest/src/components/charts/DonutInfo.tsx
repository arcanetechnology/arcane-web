/** @format */

import { VoidComponent } from 'solid-js';
import { SolidApexCharts } from 'solid-apexcharts';

const DonutInfo: VoidComponent = () => {
  return (
    <SolidApexCharts
      options={{
        chart: {
          id: 'solidchart-example',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      }}
      series={[
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ]}
      type="bar"
      width={"500"}
    />
  );
};

export default DonutInfo;
