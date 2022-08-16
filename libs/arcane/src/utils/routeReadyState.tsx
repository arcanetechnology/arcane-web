/** @format */

import { createComputed } from 'solid-js';

export const [routeReadyState, setRouteReadyState] = createSignal(
  { loading: false, routeChanged: false, loadingBar: false },
  { equals: false }
);

let init = true;

export const useRouteReadyState = () => {
  if (isServer) return;

  const restorePageHeight = () => {
    const pageEl = document.body;
    pageEl.style.minHeight = '';
  };

  try {
    const data = useRouteData<{ loading: boolean }>();

    createComputed(() => {
      if (!data.loading) {
        setRouteReadyState((prev) => ({
          ...prev,
          loading: false,
          loadingBar: false,
        }));
        if (init) {
          init = false;
          return true;
        }
        // @ts-ignore
        window.scrollTo({ top: 0, behavior: 'instant' });
        restorePageHeight();
      }
    });
  } catch (err) {
    setRouteReadyState((prev) => ({
      ...prev,
      loading: false,
      loadingBar: false,
    }));
    if (init) {
      init = false;
      return true;
    }

    // @ts-ignore
    window.scrollTo({ top: 0, behavior: 'instant' });
    restorePageHeight();
  }
};
