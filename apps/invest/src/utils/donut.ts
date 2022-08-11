/** @format */
import * as d3 from 'd3';

type Stroke = 'none' | 'black' | 'white';
type StrokeLineJoin = 'round';

interface OptionalChartOptions<N> {
  title: (...val) => string;
  names: Iterable<N>;
  colors: Array<string>;
}

type DefaultChartOptions = {
  width: number;
  height: number;
  innerRadius: number;
  outerRadius: number;
  labelRadius: number;
  padAngle: number;
  strokeWidth: number;
  stroke: Stroke;
  strokeLinejoin: StrokeLineJoin;
  format: string;
  labels: boolean;
  legends: boolean;
};

interface ChartOptions<T, N, V extends number>
  extends Partial<DefaultChartOptions>,
    Partial<OptionalChartOptions<N>> {
  name: (value: T, index: number, iterable: Iterable<T>) => N;
  value: (value: T, index: number, iterable: Iterable<T>) => V;
}

export function createDonutChart<T, N, V extends number>(
  data: Array<T>,
  {
    name,
    value,
    title,
    names,
    colors,
    width = 300,
    height = 300,
    innerRadius = Math.min(width, height) / 3,
    outerRadius = Math.min(width, height) / 2,
    labelRadius = (innerRadius + outerRadius) / 2,
    strokeWidth = 1,
    stroke = innerRadius > 0 ? 'none' : 'white',
    strokeLinejoin = 'round',
    padAngle = stroke === 'none' ? 1 / outerRadius : 0,
    format = ',',
    labels = true,
    legends = true,
  }: ChartOptions<T, N, V>
) {
  // Compute values.
  const N = d3.map(data, name);
  const V = d3.map(data, value);
  const I = d3.range(N.length).filter((i) => !isNaN(V[i]));

  // Unique the names.
  if (names === undefined) names = N;

  const newNames = new d3.InternSet(names);

  // Chose a default color scheme based on cardinality.
  if (colors === undefined)
    colors = d3.schemeSpectral[newNames.size] as Array<string>;
  if (colors === undefined)
    colors = d3.quantize(
      (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
      newNames.size
    );

  // Construct scales.
  const color = d3.scaleOrdinal(newNames, colors);

  // Compute titles.
  if (title === undefined) {
    const formatValue = d3.format(format);
    title = (i) => `${N[i]}\n${formatValue(V[i])}`;
  } else {
    const O = d3.map(data, (d) => d);
    const T = title;
    title = (i) => T(O[i], i, data);
  }

  // Construct arcs.
  const arcs = d3
    .pie()
    .padAngle(padAngle)
    .sort(null)
    .value((i) => V[i as number])(I);
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  const arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [-width / 2, -height / 2, width, height])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  svg
    .append('g')
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)
    .attr('stroke-linejoin', strokeLinejoin)
    .selectAll('path')
    .data(arcs)
    .join('path')
    .attr('fill', (d) => color(N[d.data as number]))
    .attr('d', arc as any)
    .append('title')
    .text((d) => title(d.data));

  if (labels) {
    svg
      .append('g')
      .attr('font-family', 'Poppins')
      .attr('font-size', 12)
      .attr('text-anchor', 'end')
      .selectAll('text')
      .data(arcs)
      .join('text')
      .attr('transform', (d) => `translate(${arcLabel.centroid(d as any)})`)
      .selectAll('tspan')
      .data((d) => {
        const lines = `${title(d.data)}`.split(/\n/);
        return d.endAngle - d.startAngle > 0.25 ? lines : lines.slice(0, 1);
      })
      .join('tspan')
      .attr('x', 0)
      .attr('y', (_, i) => `${i * 1.1}em`)
      .attr('font-weight', (_, i) => (i ? null : 'bold'))
      .text((d) => d);
  }

  if (legends) {
    svg
      .append('circle')
      .attr('cx', 160)
      .attr('cy', 0)
      .attr('r', 6)
      .style('fill', '#69b3a2');
    svg
      .append('text')
      .attr('x', 160)
      .attr('y', 0)
      .text('variable A')
      .style('font-size', '15px')
      .attr('alignment-baseline', 'middle');
  }

  return Object.assign(svg.node(), { scales: { color } });
}