/** @format */
// @refresh reload
/** @format */

// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import { Title, Meta as SolidMeta } from 'solid-meta';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Suspense } from 'solid-js';
import { AppContextProvider, Cookies, Header } from './components';
import type { ParentComponent } from 'solid-js';
import { I18nContext, createI18nContext } from '@solid-primitives/i18n';
import '@arcane-web/alchemy';
import './root.scss';
import { preventSmoothScrollOnTabbing } from './utils';

// @refresh reload

export default function Root() {
  preventSmoothScrollOnTabbing();
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${
            import.meta.env.VITE_GTAG_ID
          }`}
        ></script>
        {`<script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('config', '${import.meta.env.VITE_GTAG_ID}');
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });
        </script>`}
        <Meta />
        <Links />
      </head>
      <body>
        <Lang>
          <Header />
          <ErrorBoundary>
            <Suspense>
              <Routes />
              <Cookies />
            </Suspense>
          </ErrorBoundary>
        </Lang>
        <Scripts />
      </body>
    </html>
  );
}

const Lang: ParentComponent = (props) => {
  const data = useRouteData<{
    isDark: true;
    i18n: ReturnType<typeof createI18nContext>;
  }>();
  const [t, { locale }] = data.i18n;
  return (
    <AppContextProvider>
      <I18nContext.Provider value={data.i18n}>
        <Title>{t('global.title', {}, 'Arcane Crypto · Platform')}</Title>
        <SolidMeta name="lang" content={locale()} />
        <div class="arcane-body" dir={t('global.dir', {}, 'ltr')}>
          {props.children}
        </div>
      </I18nContext.Provider>
    </AppContextProvider>
  );
};
