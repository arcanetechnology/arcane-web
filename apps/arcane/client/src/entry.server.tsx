/** @format */

import { renderToStringAsync, generateHydrationScript } from 'solid-js/web';
import devalue from 'devalue';
import type { EntryProps } from '../types';
import { createApp } from './App';

export async function render(values: EntryProps) {
  const renderPromise = renderToStringAsync(() => createApp(values));
  return {
    html: await renderPromise,
    hydration: `<script>window.hydration = ${devalue(values)}</script>`,
    hydrationScript: generateHydrationScript(),
  };
}
