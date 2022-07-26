/** @format */

import type { RouteDataFunc } from 'solid-app-router';
import { isServer } from 'solid-js/web';
import { fetchAppsCollection } from './api';

// TODO: check if sameSite attribute is necessary.
const createRootStore = () => {
  const now = new Date();
  const cookieOptions = {
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()),
  };

  const [settings, set] = createCookieStorage({ options: cookieOptions });

  return [
    settings as {
      dark: 'false' | 'true';
      locale: string;
      showCookie: 'false' | 'true';
    },
    (key: string, value: string) =>
      isServer ? set(key, value) : set(key, value, cookieOptions),
  ] as const;
};

const langs: { [lang: string]: any } = {
  en: async () => (await import('../lang/en/en')).default(),
};

// Some browsers does not map correctly to some locale code
// due to offering multiple locale code for similar language (e.g. tl and fil)
// This object maps it to correct `langs` key
const langAliases: Record<string, string> = {
  fil: 'tl',
};
type DataParams = {
  locale: string;
  page: string;
};

const RootData: RouteDataFunc = (props) => {
  const [settings, set] = createRootStore();

  const browserLang = !isServer ? navigator.language.slice(0, 2) : 'en';
  const location = props.location;
  if (location.query['locale']) {
    set('locale', location.query['locale']);
  } else if (!settings.locale && langs.hasOwnProperty(browserLang)) {
    set('locale', browserLang);
  }

  // set cookie popup to true on first visit

  set('showCookie', 'true');

  const i18n = createI18nContext({}, (settings.locale || 'en') as string);

  const [, { add, locale }] = i18n;

  const params = (): DataParams => {
    const locale = i18n[1].locale();
    let page = location.pathname.slice(1);
    if (page == '') {
      page = 'home';
    }
    if (locale in langAliases) {
      return { locale: langAliases[locale]!, page };
    }
    return { locale, page };
  };

  const apps = fetchAppsCollection();

  const [lang] = createResource(params, ({ locale }) => langs[locale]());

  const isDark = () =>
    settings.dark === 'true'
      ? true
      : settings.dark === 'false'
      ? false
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

  createEffect(() => set('locale', locale()));

  // store apps in cookies
  createEffect(() =>
    set('apps', JSON.stringify(apps()?.applicationCollection.items))
  );

  createEffect(() => {
    if (!lang.loading) add(locale(), lang() as Record<string, any>);
  });

  createEffect(() => {
    document.documentElement.lang = locale();
  });
  createEffect(() => {
    if (isDark()) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  });

  return {
    set isDark(value) {
      set('dark', value === true ? 'true' : 'false');
    },
    get isDark() {
      return isDark();
    },
    get i18n() {
      return i18n;
    },
    get loading() {
      return lang.loading;
    },

    get apps() {
      return apps()?.applicationCollection.items;
    },

    get showCookie() {
      return settings.showCookie === 'true';
    },

    set showCookie(value) {
      set('showCookie', value === true ? 'true' : 'false');
    },
  };
};

export default RootData;
