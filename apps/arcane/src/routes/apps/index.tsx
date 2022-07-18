/** @format */

// TODO: try to statically generate the apps list

import { fetchAppsCollection } from '~/api';
import { Link, RouteDataFunc, useRouteData } from 'solid-app-router';
import { For, Resource, Show, VoidComponent } from 'solid-js';
import type { ApplicationCollection } from '~/api/types';

export const routeData: RouteDataFunc = () => {
  const apps = fetchAppsCollection();
  return apps;
};

const Apps: VoidComponent = () => {
  const apps = useRouteData<Resource<ApplicationCollection>>();

  return (
    <>
      <Show when={apps()}>
        <For each={apps().applicationCollection.items}>
          {(item) => (
            <>
              <Link href={`/apps/${item.path}`}>
                <>{item.name}</>
              </Link>
            </>
          )}
        </For>
      </Show>
    </>
  );
};

export default Apps;
