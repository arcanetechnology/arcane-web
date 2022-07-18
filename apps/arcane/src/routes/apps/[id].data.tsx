/** @format */

import type { RouteDataFuncArgs } from 'solid-app-router';
import { fetchAppsCollection } from '~/api';

export const AppData = ({ params }: RouteDataFuncArgs) => {
  const apps = fetchAppsCollection();
  const app = apps().applicationCollection.items.find(
    (app) => app.name === params.id
  );
  return app;
};

export type AppDataType = ReturnType<typeof AppData>;
