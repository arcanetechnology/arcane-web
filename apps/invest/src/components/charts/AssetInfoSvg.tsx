/** @format */

import { createSignal, onMount, Show, VoidComponent } from 'solid-js';
import { Assets } from '../../invest.types';
import { Card } from '@arcane-web/alchemy-solid';
import { createDonutChart } from '../../utils';

type AssetInfoProps = {
  data: Assets;
  title: string;
};

const AssetInfoSvg: VoidComponent<AssetInfoProps> = (props) => {
  const [chart, setChart] = createSignal<SVGElement | null>(null);
  onMount(() => {
    const chart = createDonutChart(props.data, {
      name: (value) => value.name,
      value: (value) => value.units,
      height: 200,
      labels: false,
    });

    setChart(chart);
  });
  return (
    <Card class="w-full">
      <Show when={chart()} fallback={'loading chart...'}>
        {chart()}
      </Show>
    </Card>
  );
};

export default AssetInfoSvg;
