import { renderToStringAsync, isServer, createComponent, Show, Portal, Dynamic, mergeProps, ssr, ssrHydrationKey, ssrSpread, ssrAttribute, escape, Assets, HydrationScript, NoHydration, For } from 'solid-js/web';
import { createCookieStorage } from '@solid-primitives/storage';
import { createI18nContext, useI18n, I18nContext } from '@solid-primitives/i18n';
import { createResource, createEffect, createContext, createSignal, onMount, useContext, createComputed, onCleanup, getOwner, runWithOwner, createMemo, createComponent as createComponent$1, useTransition, createRenderEffect, untrack, on, resetErrorBoundaries, children, createRoot, Show as Show$1, splitProps, lazy, ErrorBoundary as ErrorBoundary$1, mergeProps as mergeProps$1, Suspense, sharedConfig } from 'solid-js';
import { createGraphQLClient, gql } from '@solid-primitives/graphql';
import { Transition } from 'solid-transition-group';
import { createForm } from '@felte/solid';

function renderAsync(fn, options) {
  return () => async (context) => {
    let markup = await renderToStringAsync(() => fn(context), options);
    if (context.routerContext.url) {
      return Response.redirect(new URL(context.routerContext.url, context.request.url), 302);
    }
    context.responseHeaders.set("Content-Type", "text/html");
    return new Response(markup, {
      status: 200,
      headers: context.responseHeaders
    });
  };
}

const client = createGraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${"033pb98fujnc"}/environments/${"master"}`, {
  Authorization: `Bearer ${"GOsWj1IHwuGaWT9hzQzzy4K2OWu1qVWqJJDkZ8Bd83Q"}`
});

const fetchAppsCollection = () => {
  const [apps] = client(gql`
      query {
        applicationCollection(limit: 20) {
          items {
            name
            logo {
              url
              description
            }
            path
          }
        }
      }
    `);
  return apps;
};

const createRootStore = () => {
  const now = new Date();
  const cookieOptions = {
    domain: "arcane.no",
    expires: new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())
  };
  const [settings, set] = createCookieStorage({
    options: cookieOptions
  });
  return [settings, (key, value) => isServer ? set(key, value) : set(key, value, cookieOptions)];
};
const langs$1 = {
  en: async () => (await Promise.resolve().then(function () { return en; })).default()
};
const langAliases = {
  fil: "tl"
};
const RootData = (props) => {
  const [settings, set] = createRootStore();
  const browserLang = !isServer ? navigator.language.slice(0, 2) : "en";
  const location = props.location;
  if (location.query["locale"]) {
    set("locale", location.query["locale"]);
  } else if (!settings.locale && langs$1.hasOwnProperty(browserLang)) {
    set("locale", browserLang);
  }
  set("showCookie", "true");
  const i18n = createI18nContext({}, settings.locale || "en");
  const [, {
    add,
    locale
  }] = i18n;
  const params = () => {
    const locale2 = i18n[1].locale();
    let page = location.pathname.slice(1);
    if (page == "") {
      page = "home";
    }
    if (locale2 in langAliases) {
      return {
        locale: langAliases[locale2],
        page
      };
    }
    return {
      locale: locale2,
      page
    };
  };
  const apps = fetchAppsCollection();
  const [lang] = createResource(params, ({
    locale: locale2
  }) => langs$1[locale2]());
  const isDark = () => settings.dark === "true" ? true : settings.dark === "false" ? false : window.matchMedia("(prefers-color-scheme: dark)").matches;
  createEffect(() => set("locale", locale()));
  createEffect(() => set("apps", JSON.stringify(apps()?.applicationCollection.items)));
  createEffect(() => {
    if (!lang.loading)
      add(locale(), lang());
  });
  createEffect(() => {
    document.documentElement.lang = locale();
  });
  createEffect(() => {
    if (isDark())
      document.documentElement.classList.add("dark");
    else
      document.documentElement.classList.remove("dark");
  });
  return {
    set isDark(value) {
      set("dark", value === true ? "true" : "false");
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
      return settings.showCookie === "true";
    },
    set showCookie(value) {
      set("showCookie", value === true ? "true" : "false");
    }
  };
};

var __glob_9_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': RootData
}, Symbol.toStringTag, { value: 'Module' }));

const MetaContext = createContext();
const cascadingTags = ["title", "meta"];

const MetaProvider = props => {
  const indices = new Map(),
        [tags, setTags] = createSignal({});
  onMount(() => {
    const ssrTags = document.head.querySelectorAll(`[data-sm=""]`); // `forEach` on `NodeList` is not supported in Googlebot, so use a workaround

    Array.prototype.forEach.call(ssrTags, ssrTag => ssrTag.parentNode.removeChild(ssrTag));
  });
  const actions = {
    addClientTag: (tag, name) => {
      // consider only cascading tags
      if (cascadingTags.indexOf(tag) !== -1) {
        setTags(tags => {
          const names = tags[tag] || [];
          return { ...tags,
            [tag]: [...names, name]
          };
        }); // track indices synchronously

        const index = indices.has(tag) ? indices.get(tag) + 1 : 0;
        indices.set(tag, index);
        return index;
      }

      return -1;
    },
    shouldRenderTag: (tag, index) => {
      if (cascadingTags.indexOf(tag) !== -1) {
        const names = tags()[tag]; // check if the tag is the last one of similar

        return names && names.lastIndexOf(names[index]) === index;
      }

      return true;
    },
    removeClientTag: (tag, index) => {
      setTags(tags => {
        const names = tags[tag];

        if (names) {
          names[index] = null;
          return { ...tags,
            [tag]: names
          };
        }

        return tags;
      });
    }
  };

  if (isServer) {
    actions.addServerTag = tagDesc => {
      const {
        tags = []
      } = props; // tweak only cascading tags

      if (cascadingTags.indexOf(tagDesc.tag) !== -1) {
        const index = tags.findIndex(prev => {
          const prevName = prev.props.name || prev.props.property;
          const nextName = tagDesc.props.name || tagDesc.props.property;
          return prev.tag === tagDesc.tag && prevName === nextName;
        });

        if (index !== -1) {
          tags.splice(index, 1);
        }
      }

      tags.push(tagDesc);
    };

    if (Array.isArray(props.tags) === false) {
      throw Error("tags array should be passed to <MetaProvider /> in node");
    }
  }

  return createComponent(MetaContext.Provider, {
    value: actions,

    get children() {
      return props.children;
    }

  });
};

const MetaTag = (tag, props) => {
  const c = useContext(MetaContext);
  if (!c) throw new Error("<MetaProvider /> should be in the tree");
  const {
    addClientTag,
    removeClientTag,
    addServerTag,
    shouldRenderTag
  } = c;
  let index = -1;
  createComputed(() => {
    index = addClientTag(tag, props.name || props.property);
    onCleanup(() => removeClientTag(tag, index));
  });

  if (isServer) {
    addServerTag({
      tag,
      props
    });
    return null;
  }

  return createComponent(Show, {
    get when() {
      return shouldRenderTag(tag, index);
    },

    get children() {
      return createComponent(Portal, {
        get mount() {
          return document.head;
        },

        get children() {
          return createComponent(Dynamic, mergeProps({
            component: tag
          }, props));
        }

      });
    }

  });
};
function renderTags(tags) {
  return tags.map(tag => {
    const keys = Object.keys(tag.props);
    const props = keys.map(k => k === "children" ? "" : ` ${k}="${tag.props[k]}"`).join("");
    return tag.props.children ? `<${tag.tag} data-sm=""${props}>${// Tags might contain multiple text children:
    //   <Title>example - {myCompany}</Title>
    Array.isArray(tag.props.children) ? tag.props.children.join("") : tag.props.children}</${tag.tag}>` : `<${tag.tag} data-sm=""${props}/>`;
  }).join("");
}
const Title = props => MetaTag("title", props);
const Meta$1 = props => MetaTag("meta", props);

function bindEvent(target, type, handler) {
    target.addEventListener(type, handler);
    return () => target.removeEventListener(type, handler);
}
function intercept([value, setValue], get, set) {
    return [get ? () => get(value()) : value, set ? (v) => setValue(set(v)) : setValue];
}
function querySelector(selector) {
    // Guard against selector being an invalid CSS selector
    try {
        return document.querySelector(selector);
    }
    catch (e) {
        return null;
    }
}
function scrollToHash(hash, fallbackTop) {
    const el = querySelector(`#${hash}`);
    if (el) {
        el.scrollIntoView();
    }
    else if (fallbackTop) {
        window.scrollTo(0, 0);
    }
}
function createIntegration(get, set, init, utils) {
    let ignore = false;
    const wrap = (value) => (typeof value === "string" ? { value } : value);
    const signal = intercept(createSignal(wrap(get()), { equals: (a, b) => a.value === b.value }), undefined, next => {
        !ignore && set(next);
        return next;
    });
    init &&
        onCleanup(init((value = get()) => {
            ignore = true;
            signal[1](wrap(value));
            ignore = false;
        }));
    return {
        signal,
        utils
    };
}
function normalizeIntegration(integration) {
    if (!integration) {
        return {
            signal: createSignal({ value: "" })
        };
    }
    else if (Array.isArray(integration)) {
        return {
            signal: integration
        };
    }
    return integration;
}
function staticIntegration(obj) {
    return {
        signal: [() => obj, next => Object.assign(obj, next)]
    };
}
function pathIntegration() {
    return createIntegration(() => ({
        value: window.location.pathname + window.location.search + window.location.hash,
        state: history.state
    }), ({ value, replace, scroll, state }) => {
        if (replace) {
            window.history.replaceState(state, "", value);
        }
        else {
            window.history.pushState(state, "", value);
        }
        scrollToHash(window.location.hash.slice(1), scroll);
    }, notify => bindEvent(window, "popstate", () => notify()), {
        go: delta => window.history.go(delta)
    });
}

const hasSchemeRegex = /^(?:[a-z0-9]+:)?\/\//i;
const trimPathRegex = /^\/+|\/+$/g;
function normalize(path, omitSlash = false) {
    const s = path.replace(trimPathRegex, "");
    return s ? (omitSlash || /^[?#]/.test(s) ? s : "/" + s) : "";
}
function resolvePath(base, path, from) {
    if (hasSchemeRegex.test(path)) {
        return undefined;
    }
    const basePath = normalize(base);
    const fromPath = from && normalize(from);
    let result = "";
    if (!fromPath || path.startsWith("/")) {
        result = basePath;
    }
    else if (fromPath.toLowerCase().indexOf(basePath.toLowerCase()) !== 0) {
        result = basePath + fromPath;
    }
    else {
        result = fromPath;
    }
    return (result || "/") + normalize(path, !result);
}
function invariant(value, message) {
    if (value == null) {
        throw new Error(message);
    }
    return value;
}
function joinPaths(from, to) {
    return normalize(from).replace(/\/*(\*.*)?$/g, "") + normalize(to);
}
function extractSearchParams(url) {
    const params = {};
    url.searchParams.forEach((value, key) => {
        params[key] = value;
    });
    return params;
}
function urlDecode(str, isQuery) {
    return decodeURIComponent(isQuery ? str.replace(/\+/g, " ") : str);
}
function createMatcher(path, partial) {
    const [pattern, splat] = path.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    const len = segments.length;
    return (location) => {
        const locSegments = location.split("/").filter(Boolean);
        const lenDiff = locSegments.length - len;
        if (lenDiff < 0 || (lenDiff > 0 && splat === undefined && !partial)) {
            return null;
        }
        const match = {
            path: len ? "" : "/",
            params: {}
        };
        for (let i = 0; i < len; i++) {
            const segment = segments[i];
            const locSegment = locSegments[i];
            if (segment[0] === ":") {
                match.params[segment.slice(1)] = locSegment;
            }
            else if (segment.localeCompare(locSegment, undefined, { sensitivity: "base" }) !== 0) {
                return null;
            }
            match.path += `/${locSegment}`;
        }
        if (splat) {
            match.params[splat] = lenDiff ? locSegments.slice(-lenDiff).join("/") : "";
        }
        return match;
    };
}
function scoreRoute(route) {
    const [pattern, splat] = route.pattern.split("/*", 2);
    const segments = pattern.split("/").filter(Boolean);
    return segments.reduce((score, segment) => score + (segment.startsWith(":") ? 2 : 3), segments.length - (splat === undefined ? 0 : 1));
}
function createMemoObject(fn) {
    const map = new Map();
    const owner = getOwner();
    return new Proxy({}, {
        get(_, property) {
            if (!map.has(property)) {
                runWithOwner(owner, () => map.set(property, createMemo(() => fn()[property])));
            }
            return map.get(property)();
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true
            };
        },
        ownKeys() {
            return Reflect.ownKeys(fn());
        }
    });
}
function expandOptionals(pattern) {
    let match = /(\/?\:[^\/]+)\?/.exec(pattern);
    if (!match)
        return [pattern];
    let prefix = pattern.slice(0, match.index);
    let suffix = pattern.slice(match.index + match[0].length);
    const prefixes = [prefix, (prefix += match[1])];
    // This section handles adjacent optional params. We don't actually want all permuations since
    // that will lead to equivalent routes which have the same number of params. For example
    // `/:a?/:b?/:c`? only has the unique expansion: `/`, `/:a`, `/:a/:b`, `/:a/:b/:c` and we can
    // discard `/:b`, `/:c`, `/:b/:c` by building them up in order and not recursing. This also helps
    // ensure predictability where earlier params have precidence.
    while ((match = /^(\/\:[^\/]+)\?/.exec(suffix))) {
        prefixes.push((prefix += match[1]));
        suffix = suffix.slice(match[0].length);
    }
    return expandOptionals(suffix).reduce((results, expansion) => [...results, ...prefixes.map(p => p + expansion)], []);
}

const MAX_REDIRECTS = 100;
const RouterContextObj = createContext();
const RouteContextObj = createContext();
const useRouter = () => invariant(useContext(RouterContextObj), "Make sure your app is wrapped in a <Router />");
let TempRoute;
const useRoute = () => TempRoute || useContext(RouteContextObj) || useRouter().base;
const useResolvedPath = (path) => {
    const route = useRoute();
    return createMemo(() => route.resolvePath(path()));
};
const useHref = (to) => {
    const router = useRouter();
    return createMemo(() => {
        const to_ = to();
        return to_ !== undefined ? router.renderPath(to_) : to_;
    });
};
const useRouteData = () => useRoute().data;
function createRoutes(routeDef, base = "", fallback) {
    const { component, data, children } = routeDef;
    const isLeaf = !children || (Array.isArray(children) && !children.length);
    const shared = {
        key: routeDef,
        element: component
            ? () => createComponent$1(component, {})
            : () => {
                const { element } = routeDef;
                return element === undefined && fallback
                    ? createComponent$1(fallback, {})
                    : element;
            },
        preload: routeDef.component
            ? component.preload
            : routeDef.preload,
        data
    };
    return asArray(routeDef.path).reduce((acc, path) => {
        for (const originalPath of expandOptionals(path)) {
            const path = joinPaths(base, originalPath);
            const pattern = isLeaf ? path : path.split("/*", 1)[0];
            acc.push({
                ...shared,
                originalPath,
                pattern,
                matcher: createMatcher(pattern, !isLeaf)
            });
        }
        return acc;
    }, []);
}
function createBranch(routes, index = 0) {
    return {
        routes,
        score: scoreRoute(routes[routes.length - 1]) * 10000 - index,
        matcher(location) {
            const matches = [];
            for (let i = routes.length - 1; i >= 0; i--) {
                const route = routes[i];
                const match = route.matcher(location);
                if (!match) {
                    return null;
                }
                matches.unshift({
                    ...match,
                    route
                });
            }
            return matches;
        }
    };
}
function asArray(value) {
    return Array.isArray(value) ? value : [value];
}
function createBranches(routeDef, base = "", fallback, stack = [], branches = []) {
    const routeDefs = asArray(routeDef);
    for (let i = 0, len = routeDefs.length; i < len; i++) {
        const def = routeDefs[i];
        if (def && typeof def === "object" && def.hasOwnProperty("path")) {
            const routes = createRoutes(def, base, fallback);
            for (const route of routes) {
                stack.push(route);
                if (def.children) {
                    createBranches(def.children, route.pattern, fallback, stack, branches);
                }
                else {
                    const branch = createBranch([...stack], branches.length);
                    branches.push(branch);
                }
                stack.pop();
            }
        }
    }
    // Stack will be empty on final return
    return stack.length ? branches : branches.sort((a, b) => b.score - a.score);
}
function getRouteMatches$1(branches, location) {
    for (let i = 0, len = branches.length; i < len; i++) {
        const match = branches[i].matcher(location);
        if (match) {
            return match;
        }
    }
    return [];
}
function createLocation(path, state) {
    const origin = new URL("http://sar");
    const url = createMemo(prev => {
        const path_ = path();
        try {
            return new URL(path_, origin);
        }
        catch (err) {
            console.error(`Invalid path ${path_}`);
            return prev;
        }
    }, origin, {
        equals: (a, b) => a.href === b.href
    });
    const pathname = createMemo(() => urlDecode(url().pathname));
    const search = createMemo(() => urlDecode(url().search, true));
    const hash = createMemo(() => urlDecode(url().hash));
    const key = createMemo(() => "");
    return {
        get pathname() {
            return pathname();
        },
        get search() {
            return search();
        },
        get hash() {
            return hash();
        },
        get state() {
            return state();
        },
        get key() {
            return key();
        },
        query: createMemoObject(on(search, () => extractSearchParams(url())))
    };
}
function createRouterContext(integration, base = "", data, out) {
    const { signal: [source, setSource], utils = {} } = normalizeIntegration(integration);
    const parsePath = utils.parsePath || (p => p);
    const renderPath = utils.renderPath || (p => p);
    const basePath = resolvePath("", base);
    const output = isServer && out
        ? Object.assign(out, {
            matches: [],
            url: undefined
        })
        : undefined;
    if (basePath === undefined) {
        throw new Error(`${basePath} is not a valid base path`);
    }
    else if (basePath && !source().value) {
        setSource({ value: basePath, replace: true, scroll: false });
    }
    const [isRouting, start] = useTransition();
    const [reference, setReference] = createSignal(source().value);
    const [state, setState] = createSignal(source().state);
    const location = createLocation(reference, state);
    const referrers = [];
    const baseRoute = {
        pattern: basePath,
        params: {},
        path: () => basePath,
        outlet: () => null,
        resolvePath(to) {
            return resolvePath(basePath, to);
        }
    };
    if (data) {
        try {
            TempRoute = baseRoute;
            baseRoute.data = data({
                data: undefined,
                params: {},
                location,
                navigate: navigatorFactory(baseRoute)
            });
        }
        finally {
            TempRoute = undefined;
        }
    }
    function navigateFromRoute(route, to, options) {
        // Untrack in case someone navigates in an effect - don't want to track `reference` or route paths
        untrack(() => {
            if (typeof to === "number") {
                if (!to) ;
                else if (utils.go) {
                    utils.go(to);
                }
                else {
                    console.warn("Router integration does not support relative routing");
                }
                return;
            }
            const { replace, resolve, scroll, state: nextState } = {
                replace: false,
                resolve: true,
                scroll: true,
                ...options
            };
            const resolvedTo = resolve ? route.resolvePath(to) : resolvePath("", to);
            if (resolvedTo === undefined) {
                throw new Error(`Path '${to}' is not a routable path`);
            }
            else if (referrers.length >= MAX_REDIRECTS) {
                throw new Error("Too many redirects");
            }
            const current = reference();
            if (resolvedTo !== current || nextState !== state()) {
                if (isServer) {
                    if (output) {
                        output.url = resolvedTo;
                    }
                    setSource({ value: resolvedTo, replace, scroll, state: nextState });
                }
                else {
                    const len = referrers.push({ value: current, replace, scroll, state: state() });
                    start(() => {
                        setReference(resolvedTo);
                        setState(nextState);
                        resetErrorBoundaries();
                    }).then(() => {
                        if (referrers.length === len) {
                            navigateEnd({
                                value: resolvedTo,
                                state: nextState
                            });
                        }
                    });
                }
            }
        });
    }
    function navigatorFactory(route) {
        // Workaround for vite issue (https://github.com/vitejs/vite/issues/3803)
        route = route || useContext(RouteContextObj) || baseRoute;
        return (to, options) => navigateFromRoute(route, to, options);
    }
    function navigateEnd(next) {
        const first = referrers[0];
        if (first) {
            if (next.value !== first.value || next.state !== first.state) {
                setSource({
                    ...next,
                    replace: first.replace,
                    scroll: first.scroll
                });
            }
            referrers.length = 0;
        }
    }
    createRenderEffect(() => {
        const { value, state } = source();
        // Untrack this whole block so `start` doesn't cause Solid's Listener to be preserved
        untrack(() => {
            if (value !== reference()) {
                start(() => {
                    setReference(value);
                    setState(state);
                });
            }
        });
    });
    if (!isServer) {
        function isSvg(el) {
            return el.namespaceURI === "http://www.w3.org/2000/svg";
        }
        function handleAnchorClick(evt) {
            if (evt.defaultPrevented ||
                evt.button !== 0 ||
                evt.metaKey ||
                evt.altKey ||
                evt.ctrlKey ||
                evt.shiftKey)
                return;
            const a = evt
                .composedPath()
                .find(el => el instanceof Node && el.nodeName.toUpperCase() === "A");
            if (!a)
                return;
            const svg = isSvg(a);
            const href = svg ? a.href.baseVal : a.href;
            const target = svg ? a.target.baseVal : a.target;
            if (target || (!href && !a.hasAttribute("state")))
                return;
            const rel = (a.getAttribute("rel") || "").split(/\s+/);
            if (a.hasAttribute("download") || (rel && rel.includes("external")))
                return;
            const url = svg ? new URL(href, document.baseURI) : new URL(href);
            const pathname = urlDecode(url.pathname);
            if (url.origin !== window.location.origin ||
                (basePath && pathname && !pathname.toLowerCase().startsWith(basePath.toLowerCase())))
                return;
            const to = parsePath(pathname + urlDecode(url.search, true) + urlDecode(url.hash));
            const state = a.getAttribute("state");
            evt.preventDefault();
            navigateFromRoute(baseRoute, to, {
                resolve: false,
                replace: a.hasAttribute("replace"),
                scroll: !a.hasAttribute("noscroll"),
                state: state && JSON.parse(state)
            });
        }
        document.addEventListener("click", handleAnchorClick);
        onCleanup(() => document.removeEventListener("click", handleAnchorClick));
    }
    return {
        base: baseRoute,
        out: output,
        location,
        isRouting,
        renderPath,
        parsePath,
        navigatorFactory
    };
}
function createRouteContext(router, parent, child, match) {
    const { base, location, navigatorFactory } = router;
    const { pattern, element: outlet, preload, data } = match().route;
    const path = createMemo(() => match().path);
    const params = createMemoObject(() => match().params);
    preload && preload();
    const route = {
        parent,
        pattern,
        get child() {
            return child();
        },
        path,
        params,
        data: parent.data,
        outlet,
        resolvePath(to) {
            return resolvePath(base.path(), to, path());
        }
    };
    if (data) {
        try {
            TempRoute = route;
            route.data = data({ data: parent.data, params, location, navigate: navigatorFactory(route) });
        }
        finally {
            TempRoute = undefined;
        }
    }
    return route;
}

const _tmpl$$n = ["<a", " ", ">", "</a>"];
const Router = props => {
  const {
    source,
    url,
    base,
    data,
    out
  } = props;
  const integration = source || (isServer ? staticIntegration({
    value: url || ""
  }) : pathIntegration());
  const routerState = createRouterContext(integration, base, data, out);
  return createComponent(RouterContextObj.Provider, {
    value: routerState,

    get children() {
      return props.children;
    }

  });
};
const Routes$1 = props => {
  const router = useRouter();
  const parentRoute = useRoute();
  const routeDefs = children(() => props.children);
  const branches = createMemo(() => createBranches(routeDefs(), joinPaths(parentRoute.pattern, props.base || ""), Outlet));
  const matches = createMemo(() => getRouteMatches$1(branches(), router.location.pathname));

  if (router.out) {
    router.out.matches.push(matches().map(({
      route,
      path,
      params
    }) => ({
      originalPath: route.originalPath,
      pattern: route.pattern,
      path,
      params
    })));
  }

  const disposers = [];
  let root;
  const routeStates = createMemo(on(matches, (nextMatches, prevMatches, prev) => {
    let equal = prevMatches && nextMatches.length === prevMatches.length;
    const next = [];

    for (let i = 0, len = nextMatches.length; i < len; i++) {
      const prevMatch = prevMatches && prevMatches[i];
      const nextMatch = nextMatches[i];

      if (prev && prevMatch && nextMatch.route.key === prevMatch.route.key) {
        next[i] = prev[i];
      } else {
        equal = false;

        if (disposers[i]) {
          disposers[i]();
        }

        createRoot(dispose => {
          disposers[i] = dispose;
          next[i] = createRouteContext(router, next[i - 1] || parentRoute, () => routeStates()[i + 1], () => matches()[i]);
        });
      }
    }

    disposers.splice(nextMatches.length).forEach(dispose => dispose());

    if (prev && equal) {
      return prev;
    }

    root = next[0];
    return next;
  }));
  return createComponent(Show$1, {
    get when() {
      return routeStates() && root;
    },

    children: route => createComponent(RouteContextObj.Provider, {
      value: route,

      get children() {
        return route.outlet();
      }

    })
  });
};
const useRoutes = (routes, base) => {
  return () => createComponent(Routes$1, {
    base: base,
    children: routes
  });
};
const Outlet = () => {
  const route = useRoute();
  return createComponent(Show$1, {
    get when() {
      return route.child;
    },

    children: child => createComponent(RouteContextObj.Provider, {
      value: child,

      get children() {
        return child.outlet();
      }

    })
  });
};

function LinkBase(props) {
  const [, rest] = splitProps(props, ["children", "to", "href", "state"]);
  const href = useHref(() => props.to);
  return ssr(_tmpl$$n, ssrHydrationKey(), ssrSpread(rest, false, true) + ssrAttribute("href", escape(href(), true) || escape(props.href, true), false) + ssrAttribute("state", escape(JSON.stringify(props.state), true), false), escape(props.children));
}

function Link(props) {
  const to = useResolvedPath(() => props.href);
  return createComponent(LinkBase, mergeProps(props, {
    get to() {
      return to();
    }

  }));
}

const StartContext = createContext({});
function StartProvider(props) {
  const [request, setRequest] = createSignal(new Request(isServer ? props.context.request.url : window.location.pathname)); // TODO: throw error if values are used on client for anything more than stubbing
  // OR replace with actual request that updates with the current URL

  return createComponent(StartContext.Provider, {
    get value() {
      return props.context || {
        get request() {
          return request();
        },

        get responseHeaders() {
          return new Headers();
        },

        get tags() {
          return [];
        },

        get manifest() {
          return {};
        },

        get routerContext() {
          return {};
        },

        setStatusCode(code) {},

        setHeader(name, value) {}

      };
    },

    get children() {
      return props.children;
    }

  });
}

const _tmpl$$m = ["<link", " rel=\"stylesheet\"", ">"],
      _tmpl$2$7 = ["<link", " rel=\"modulepreload\"", ">"];

function getAssetsFromManifest(manifest, routerContext) {
  const match = routerContext.matches.reduce((memo, m) => {
    memo.push(...(manifest[mapRouteToFile(m)] || []));
    return memo;
  }, []);
  const links = match.reduce((r, src) => {
    r[src.href] = src.type === "style" ? ssr(_tmpl$$m, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false)) : ssr(_tmpl$2$7, ssrHydrationKey(), ssrAttribute("href", escape(src.href, true), false));
    return r;
  }, {});
  return Object.values(links);
}

function mapRouteToFile(matches) {
  return matches.map(h => h.originalPath.replace(/:(\w+)/, (f, g) => `[${g}]`).replace(/\*(\w+)/, (f, g) => `[...${g}]`)).join("");
}
/**
 * Links are used to load assets for the server.
 * @returns {JSXElement}
 */


function Links() {
  const context = useContext(StartContext);
  return createComponent(Assets, {
    get children() {
      return getAssetsFromManifest(context.manifest, context.routerContext);
    }

  });
}

function Meta() {
  const context = useContext(StartContext); // @ts-expect-error The ssr() types do not match the Assets child types

  return createComponent(Assets, {
    get children() {
      return ssr(renderTags(context.tags));
    }

  });
}

/// <reference path="../server/types.tsx" />
const routes = [{
  component: lazy(() => Promise.resolve().then(function () { return ____404_$1; })),
  path: "/*404"
}, {
  component: lazy(() => Promise.resolve().then(function () { return cookies; })),
  path: "/cookies"
}, {
  component: lazy(() => Promise.resolve().then(function () { return index$1; })),
  path: "/"
}, {
  component: lazy(() => Promise.resolve().then(function () { return invest; })),
  path: "/invest"
}, {
  component: lazy(() => Promise.resolve().then(function () { return login; })),
  path: "/login"
}, {
  component: lazy(() => Promise.resolve().then(function () { return people; })),
  path: "/people"
}, {
  component: lazy(() => Promise.resolve().then(function () { return privacy; })),
  path: "/privacy"
}, {
  component: lazy(() => Promise.resolve().then(function () { return relations; })),
  path: "/relations"
}, {
  component: lazy(() => Promise.resolve().then(function () { return trade$1; })),
  path: "/trade"
}, {
  component: lazy(() => Promise.resolve().then(function () { return index; })),
  path: "/app/"
}, {
  component: lazy(() => Promise.resolve().then(function () { return trade; })),
  path: "/app/trade"
}]; // console.log(routes);

/**
 * Routes are the file system based routes, used by Solid App Router to show the current page according to the URL.
 */

const Routes = useRoutes(routes);

const _tmpl$$l = ["<script", " type=\"module\" async", "></script>"];

function getFromManifest(manifest) {
  const match = manifest["*"];
  const entry = match.find(src => src.type === "script");
  return ssr(_tmpl$$l, ssrHydrationKey(), ssrAttribute("src", escape(entry.href, true), false));
}

function Scripts() {
  const context = useContext(StartContext);
  return [createComponent(HydrationScript, {}), createComponent(NoHydration, {
    get children() {
      return isServer && (getFromManifest(context.manifest));
    }

  })];
}

const _tmpl$$k = ["<div", " style=\"", "\"><div style=\"", "\"><p style=\"", "\" id=\"error-message\">", "</p><button id=\"reset-errors\" style=\"", "\">Clear errors and retry</button><pre style=\"", "\">", "</pre></div></div>"];
function ErrorBoundary(props) {
  return createComponent(ErrorBoundary$1, {
    fallback: e => {
      return createComponent(Show$1, {
        get when() {
          return !props.fallback;
        },

        get fallback() {
          return props.fallback(e);
        },

        get children() {
          return createComponent(ErrorMessage, {
            error: e
          });
        }

      });
    },

    get children() {
      return props.children;
    }

  });
}

function ErrorMessage(props) {
  return ssr(_tmpl$$k, ssrHydrationKey(), "padding:" + "16px", "background-color:" + "rgba(252, 165, 165)" + (";color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";overflow:" + "scroll") + (";padding:" + "16px") + (";margin-bottom:" + "8px"), "font-weight:" + "bold", escape(props.error.message), "color:" + "rgba(252, 165, 165)" + (";background-color:" + "rgb(153, 27, 27)") + (";border-radius:" + "5px") + (";padding:" + "4px 8px"), "margin-top:" + "8px" + (";width:" + "100%"), escape(props.error.stack));
}

var logo = "/assets/logo.ea4c43ee.svg";

/** @format */
const AppContext = createContext({
  isDark: false,
  loading: true,
  showCookie: true,
  apps: []
});
const AppContextProvider = props => {
  const data = useRouteData();
  return createComponent(AppContext.Provider, {
    value: data,

    get children() {
      return props.children;
    }

  });
};
const useAppContext = () => useContext(AppContext);

var Navigation$1 = '';

const _tmpl$$j = ["<div", " id=\"menu-container\" class=\"menu-container\" data-is-closed=\"true\"><div", " class=\"menu-btn circle-hover\"><abbr class=\"clear-df-abbr\"", "><svg viewBox=\"0 0 24 24\"><path d=\"M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z\"></path></svg></abbr></div><div", " class=\"menu margin-12\"><nav class=\"gap-small\" data-auto-grid=\"2\">", "</nav></div></div>"],
      _tmpl$2$6 = ["<img", " width=\"40\" height=\"40\"", " alt=\"", "\">"],
      _tmpl$3$3 = ["<div", " class=\"app-nav\"><!--#-->", "<!--/--><p class=\"button-small\">", "</p></div>"];

const Navigation = () => {
  const [t] = useI18n();
  const context = useAppContext();
  const arcaneApps = createMemo(() => {
    if (context.apps) {
      return context.apps;
    } else {
      return null;
    }
  });
  createEffect(() => {});
  const NAVIGATION_MENU_ID = 'arcane-header-navigation-menu';
  const NAVIGATION_MENU_BUTTON_ID = 'arcane-header-navigation-menu-button';

  return ssr(_tmpl$$j, ssrHydrationKey(), ssrAttribute("id", escape(NAVIGATION_MENU_BUTTON_ID, true), false), ssrAttribute("title", escape(t('global.apps.title', {}, 'Arcane Apps'), true), false), ssrAttribute("id", escape(NAVIGATION_MENU_ID, true), false), escape(createComponent(Show, {
    get when() {
      return arcaneApps();
    },

    get children() {
      return createComponent(For, {
        get each() {
          return arcaneApps();
        },

        children: app => ssr(_tmpl$3$3, ssrHydrationKey(), escape(createComponent(Link, {
          "class": "app-nav-link",

          get href() {
            return '/' + (app.path ?? '');
          },

          get children() {
            return ssr(_tmpl$2$6, ssrHydrationKey(), ssrAttribute("src", escape(app.logo.url, true), false), `${escape(app.logo.description, true)} logo`);
          }

        })), escape(app.name))
      });
    }

  })));
};

var Header$1 = '';

const _tmpl$$i = ["<img", " alt=\"logo\">"],
      _tmpl$2$5 = ["<header", " role=\"banner\"><div class=\"container align-row margin-12\"><!--#-->", "<!--/--><div style=\"", "\"></div><!--#-->", "<!--/--></div></header>"];

const Header = () => {
  return ssr(_tmpl$2$5, ssrHydrationKey(), escape(createComponent(Transition, {
    onEnter: onLogoEnter,
    appear: !isServer,

    get children() {
      return ssr(_tmpl$$i, ssrHydrationKey() + ssrAttribute("src", escape(logo, true), false));
    }

  })), "flex-grow:" + 1, escape(createComponent(Navigation, {})));
};

const base = {
  opacity: 1
};
const options = {
  duration: 1300
};

const onLogoEnter = (el, done) => {
  el.animate([{
    opacity: 0
  }, base], options).finished.then(done);
};

const _tmpl$$h = ["<button", " id=\"", "\" ", ">", "</button>"];
/**
 * low level base button without any custom style, all styles are inherited from css files.
 * @param @type {BaseButtonProps} accepst all types of button properties of an html button.
 * @returns @type {JSX.Element} renders and html button
 */

const BaseButton = props => {
  const [local, others] = splitProps(props, ['id', 'children']);
  return ssr(_tmpl$$h, ssrHydrationKey(), `${escape(local.id, true)}-button`, ssrSpread(others, false, true), escape(local.children));
};
/**
 * mid level button wrapped in arcane design languge css based on prop values
 * @param @type {ButtonProps} accepst all types of button properties of an html button.
 * @returns @type {BaseButton} renders base button.
 */

const Button = props => {
  const merged = mergeProps$1({
    variant: 'primary',
    id: 'arcane',
    size: 'large'
  }, props);
  const [local, others] = splitProps(merged, ['id', 'variant', 'children', 'class', 'classList']);
  return createComponent(BaseButton, mergeProps({
    get ["class"]() {
      return ['button'].concat(local.class ?? '').join(' ');
    },

    get classList() {
      return {
        'button-primary': props.variant === 'primary',
        'button-secondary': props.variant === 'secondary',
        'button-tertiary': props.variant === 'tertiary',
        'button-large': props.size === 'large',
        'button-medium': props.size === 'medium',
        'button-small': props.size === 'small',
        ...local.classList
      };
    },

    get id() {
      return `${local.id}-${local.variant}`;
    }

  }, others, {
    get children() {
      return local.children;
    }

  }));
};

const _tmpl$$g = ["<form", " ", ">", "</form>"];

const Form = props => {
  const [local, others] = splitProps(props, ['children']);
  return ssr(_tmpl$$g, ssrHydrationKey(), ssrSpread(others, false, true), escape(local.children));
};

const _tmpl$$f = ["<div", " class=\"modal-background\"><div class=\"", "\"><div class=\"modal-close\">", "</div><!--#-->", "<!--/--></div></div>"];

const Modal = props => {
  const mergedProps = mergeProps$1({
    size: 'large'
  }, props);
  const [local, others] = splitProps(mergedProps, ['size', 'children']);
  return createComponent(Show$1, {
    get when() {
      return others.isOpen;
    },

    fallback: null,

    get children() {
      return ssr(_tmpl$$f, ssrHydrationKey(), `elevation-300 radius-small modal ${local.size === 'small' ? "modal-small" : ""} ${local.size === 'large' ? "modal-large" : ""}`, escape(createComponent(Button, {
        variant: "tertiary",
        type: "button",
        onClick: () => others.toggleModal(false),
        "class": "modal-close",
        children: "X"
      })), escape(local.children));
    }

  });
};

const _tmpl$$e = ["<div", " class=\"", "\"><div class=\"wrg-toggle-container\"><div class=\"wrg-toggle-check\"><span>", "</span></div><div class=\"wrg-toggle-uncheck\"><span>", "</span></div></div><div class=\"wrg-toggle-circle\"></div><input", " type=\"checkbox\" aria-label=\"Toggle Button\" class=\"wrg-toggle-input\"></div>"];

const checked = () => [];

const unchecked = () => [];

const Toggle = props => {
  const [toggle, setToggle] = createSignal(false);
  createEffect(() => {
    if (props.defaultChecked) {
      setToggle(props.defaultChecked);
    }
  });

  const getIcon = state => {
    if (state === 'checked') {
      return checked();
    }

    return unchecked();
  };

  return ssr(_tmpl$$e, ssrHydrationKey(), `wrg-toggle ${toggle() ? "wrg-toggle--checked" : ""} ${props.disabled ? "wrg-toggle--disabled" : ""}`, escape(getIcon('checked')), escape(getIcon('unchecked')), ssrAttribute("name", escape(props.name, true), false));
};

const _tmpl$$d = ["<section", "><section class=\"margin-48\"><div id=\"error\" class=\"container\" style=\"", "\">", "</div></section></section>"];

/** @format */
const Banner = props => {
  return ssr(_tmpl$$d, ssrHydrationKey(), "text-align:" + "center", escape(props.children));
};

var back = "/assets/back.612dc836.svg";

const _tmpl$$c = ["<img", " width=\"20\">"],
      _tmpl$2$4 = ["<article", " class=\"align-center gap-big\"><div class=\"align-row gap-small\"><!--#-->", "<!--/--><p class=\"heading8\">", "</p></div><div class=\"align-vertical gap-big\"><div class=\"align-vertical gap-default\"><p class=\"body3\"><!--#-->", "<!--/--> <!--#-->", "<!--/--></p><!--#-->", "<!--/--></div><div class=\"w-full align-row\" style=\"", "\"><!--#-->", "<!--/--><div style=\"", "\"></div><!--#-->", "<!--/--></div></div></article>"],
      _tmpl$3$2 = ["<div", " class=\"w-full\"><div class=\"align-row\"><p class=\"body1\">", "</p><div style=\"", "\"></div><!--#-->", "<!--/--></div><p class=\"small\">", "</p></div>"];

const normalizeCookieType = title => title.replace(/ /g, '-').toLowerCase();

const Cookies$1 = () => {
  const [t] = useI18n();
  const [isOpen, toggleModal] = createSignal(false);
  const [isBreakDown, toggleBreakDown] = createSignal(false);
  const context = useAppContext();
  const {
    form,
    data,
    setData
  } = createForm({
    initialValues: {
      'strictly-necessary': true,
      'product-development': true
    },
    onSubmit: () => {
      gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'granted'
      });
      context.showCookie = !context.showCookie;
      toggleModal(false);
    }
  });
  createEffect(on(isOpen, isOpen => {
    if (!isOpen && context.showCookie) {
      toggleModal(true);
    }
  }));
  return createComponent(Modal, {
    size: "small",
    toggleModal: toggleModal,

    get isOpen() {
      return isOpen();
    },

    get children() {
      return createComponent(Form, {
        get children() {
          return ssr(_tmpl$2$4, ssrHydrationKey(), escape(createComponent(Show$1, {
            get when() {
              return isBreakDown();
            },

            get children() {
              return createComponent(Button, {
                type: "button",
                onClick: () => toggleBreakDown(false),

                get children() {
                  return ssr(_tmpl$$c, ssrHydrationKey() + ssrAttribute("src", escape(back, true), false));
                }

              });
            }

          })), escape(t('global.cookie.title', {}, 'Cookie Settings')), escape(t('global.cookie.description', {}, 'We use cookies to improve your experience on our website.')), escape(createComponent(Link, {
            href: "/cookies",

            get children() {
              return t('global.cookie.link', {}, 'learn more');
            }

          })), escape(createComponent(Show$1, {
            get when() {
              return isBreakDown();
            },

            get children() {
              return t('global.cookie.sections', {}, '').map(section => {
                const name = normalizeCookieType(section.title);
                return ssr(_tmpl$3$2, ssrHydrationKey(), escape(section.title), "flex-grow:" + 1, escape(createComponent(Toggle, {
                  get defaultChecked() {
                    return data(name);
                  },

                  onChange: checked => setData(name, !checked),
                  name: name,

                  get disabled() {
                    return section.disabled;
                  }

                })), escape(section.description));
              });
            }

          })), "bottom:" + 0 + (";position:" + "relative"), escape(createComponent(Show$1, {
            get when() {
              return isBreakDown();
            },

            get fallback() {
              return createComponent(Button, {
                type: "button",
                variant: "secondary",
                onClick: () => toggleBreakDown(true),

                get children() {
                  return t('global.cookie.manage', {}, 'Manage Cookies');
                }

              });
            },

            get children() {
              return createComponent(Button, {
                type: "button",
                variant: "secondary",
                onClick: () => toggleModal(false),

                get children() {
                  return t('global.cookie.cancel', {}, 'Cancel');
                }

              });
            }

          })), "flex-grow:" + 1, escape(createComponent(Button, {
            type: "submit",
            variant: "primary",

            get children() {
              return t('global.cookie.accept', {}, 'Accept');
            }

          })));
        }

      });
    }

  });
};

const _tmpl$$b = ["<h6", " id=\"arcane-not-found\">", "</h6>"];

const NotFound = () => {
  const [t] = useI18n();
  return createComponent(Banner, {
    get children() {
      return ssr(_tmpl$$b, ssrHydrationKey(), escape(t('global.404', {}, 'could not find the info')));
    }

  });
};

var NotFound$1 = NotFound;

var linkedin = "/assets/linkedin.de4b4749.svg";

var twitter = "/assets/twitter.9d5edd23.svg";

var Footer$1 = '';

const _tmpl$$a = ["<p", " class=\"body3 footer-link\"><img width=\"20\" style=\"", "\"", " alt=\"arcane twitter\"></p>"],
      _tmpl$2$3 = ["<img", " width=\"20\" style=\"", "\"", " alt=\"arcane linkedin\">"],
      _tmpl$3$1 = ["<footer", "><div class=\"container footer-row margin-48\"><div><img style=\"", "\"", " alt=\"arcane-logo\"></div><div style=\"", "\"></div><div><p class=\"heading8\">", "</p><nav id=\"arcane-application-navigation\" class=\"align-vertical\">", "</nav></div><div><p class=\"heading8\">", "</p><nav id=\"arcane-static\" class=\"align-vertical\"><!--#-->", "<!--/--><!--#-->", "<!--/--><!--#-->", "<!--/--></nav></div></div><hr><div class=\"container footer-row margin-12\"><p class=\"body3\">", "</p><p class=\"body3\">", "</p><div style=\"", "\"></div><div class=\"footer-follow gap-small\"><p class=\"body3\">", "</p><!--#-->", "<!--/--><!--#-->", "<!--/--></div></div></footer>"];

const Footer = () => {
  const [t] = useI18n();
  const [apps, setApps] = createSignal([]);
  const context = useAppContext();
  createEffect(() => {
    if (context.apps) {
      setApps(context.apps);
    }
  });
  return ssr(_tmpl$3$1, ssrHydrationKey(), "filter:" + "invert(1)", ssrAttribute("src", escape(logo, true), false), "flex-grow:" + 1, escape(t('global.footer.navigation.title', {}, 'Navigation')), escape(createComponent(Show, {
    get when() {
      return apps().length !== 0;
    },

    get children() {
      return createComponent(For, {
        get each() {
          return apps();
        },

        children: app => createComponent(Link, {
          get href() {
            return window.location.origin + '/' + app.path ?? '';
          },

          "class": "third after footer-link body1",

          get children() {
            return app.name;
          }

        })
      });
    }

  })), escape(t('global.footer.company.title', {}, 'Company')), escape(createComponent(Link, {
    href: "/people",
    "class": "third after footer-link body1",

    get children() {
      return t('global.footer.company.people', {}, 'Privacy Policy');
    }

  })), escape(createComponent(Link, {
    href: "/relations",
    "class": "third after footer-link body1",

    get children() {
      return t('global.footer.company.relations', {}, 'Investor Relations');
    }

  })), escape(createComponent(Link, {
    href: "/privacy",
    "class": "third after footer-link body1",

    get children() {
      return t('global.footer.company.privacy', {}, 'Privacy Policy');
    }

  })), escape(t('global.footer.copyright', {
    date: '2022'
  }, '© All rights reserved to Arcane.')), escape(t('global.footer.message', {}, 'Made with ❤️ in Norway')), "flex-grow:" + 1, escape(t('global.footer.social.title', {}, 'Follow Us')), escape(createComponent(Link, {
    href: 'https://twitter.com/arcane_crypto',

    get children() {
      return ssr(_tmpl$$a, ssrHydrationKey(), "filter:" + "invert(1)", ssrAttribute("src", escape(twitter, true), false));
    }

  })), escape(createComponent(Link, {
    href: 'https://www.linkedin.com/company/arcane-crypto/',

    get children() {
      return ssr(_tmpl$2$3, ssrHydrationKey(), "filter:" + "invert(1)", ssrAttribute("src", escape(linkedin, true), false));
    }

  })));
};

const _tmpl$$9 = ["<main", " style=\"", "\">", "</main>"];

const Public = props => {
  return [ssr(_tmpl$$9, ssrHydrationKey(), "flex:" + "1 0 auto", escape(props.children)), createComponent(Footer, {})];
};

var Public$1 = Public;

const _tmpl$$8 = ["<main", " style=\"", "\">", "</main>"];

/** @format */
const Private = props => {
  return ssr(_tmpl$$8, ssrHydrationKey(), "flex:" + "1 0 auto", escape(props.children));
};

var core = '';

var root = '';

createSignal({
  loading: false,
  routeChanged: false,
  loadingBar: false
}, {
  equals: false
});

/** @format */
const preventSmoothScrollOnTabbing = () => {
  if (isServer) return;
  document.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    document.documentElement.style.scrollBehavior = '';
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    });
  });
};

const _tmpl$$7 = ["<head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&amp;display=swap\" rel=\"stylesheet\"><script async src=\"", "\"></script><link rel=\"icon\" type=\"image/png\" href=\"http://example.com/favicon.png\">", "", "", "</head>"],
      _tmpl$2$2 = ["<html", " lang=\"en\">", "<body><!--#-->", "<!--/--><!--#-->", "<!--/--></body></html>"],
      _tmpl$3 = ["<div", " class=\"arcane-body\"", ">", "</div>"];

function Root() {
  preventSmoothScrollOnTabbing();
  return ssr(_tmpl$2$2, ssrHydrationKey(), NoHydration({
    get children() {
      return ssr(_tmpl$$7, `https://www.googletagmanager.com/gtag/js?id=${escape("G-SBY3V7YVL3", true)}`, `<script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('config', '${escape("G-SBY3V7YVL3")}');
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
          });
        </script>`, escape(createComponent(Meta, {})), escape(createComponent(Links, {})));
    }

  }), escape(createComponent(Lang, {
    get children() {
      return [createComponent(Header, {}), createComponent(ErrorBoundary, {
        get children() {
          return createComponent(Suspense, {
            get children() {
              return [createComponent(Routes, {}), createComponent(Cookies$1, {})];
            }

          });
        }

      })];
    }

  })), escape(createComponent(Scripts, {})));
}

const Lang = props => {
  const data = useRouteData();
  const [t, {
    locale
  }] = data.i18n;
  return createComponent(AppContextProvider, {
    get children() {
      return createComponent(I18nContext.Provider, {
        get value() {
          return data.i18n;
        },

        get children() {
          return [createComponent(Title, {
            get children() {
              return t('global.title', {}, 'Arcane Crypto · Platform');
            }

          }), createComponent(Meta$1, {
            name: "lang",

            get content() {
              return locale();
            }

          }), ssr(_tmpl$3, ssrHydrationKey(), ssrAttribute("dir", escape(t('global.dir', {}, 'ltr'), true), false), escape(props.children))];
        }

      });
    }

  });
};

const api = [
  {
    get: "skip",
    path: "/*404"
  },
  {
    get: "skip",
    path: "/cookies"
  },
  {
    get: "skip",
    path: "/"
  },
  {
    get: "skip",
    path: "/invest"
  },
  {
    get: "skip",
    path: "/login"
  },
  {
    get: "skip",
    path: "/people"
  },
  {
    get: "skip",
    path: "/privacy"
  },
  {
    get: "skip",
    path: "/relations"
  },
  {
    get: "skip",
    path: "/trade"
  },
  {
    get: "skip",
    path: "/app/"
  },
  {
    get: "skip",
    path: "/app/trade"
  }
];
function routeToMatchRoute(route) {
  const segments = route.path.split("/").filter(Boolean);
  const params = [];
  const matchSegments = [];
  let score = route.path.endsWith("/") ? 4 : 0;
  let wildcard = false;
  for (const [index, segment] of segments.entries()) {
    if (segment[0] === ":") {
      const name = segment.slice(1);
      score += 3;
      params.push({
        type: ":",
        name,
        index
      });
      matchSegments.push(null);
    } else if (segment[0] === "*") {
      params.push({
        type: "*",
        name: segment.slice(1),
        index
      });
      wildcard = true;
    } else {
      score += 4;
      matchSegments.push(segment);
    }
  }
  return {
    ...route,
    score,
    params,
    matchSegments,
    wildcard
  };
}
function getRouteMatches(routes, path, method) {
  const segments = path.split("/").filter(Boolean);
  routeLoop:
    for (const route of routes) {
      const matchSegments = route.matchSegments;
      if (segments.length < matchSegments.length || !route.wildcard && segments.length > matchSegments.length) {
        continue;
      }
      for (let index = 0; index < matchSegments.length; index++) {
        const match = matchSegments[index];
        if (!match) {
          continue;
        }
        if (segments[index] !== match) {
          continue routeLoop;
        }
      }
      const handler = route[method];
      if (handler === "skip" || handler === void 0) {
        return;
      }
      const params = {};
      for (const { type, name, index } of route.params) {
        if (type === ":") {
          params[name] = segments[index];
        } else {
          params[name] = segments.slice(index).join("/");
        }
      }
      return { handler, params };
    }
}
const allRoutes = api.map(routeToMatchRoute).sort((a, b) => b.score - a.score);
function getApiHandler(url, method) {
  return getRouteMatches(allRoutes, url.pathname, method.toLowerCase());
}

class FormError extends Error {
  constructor(message, {
    fieldErrors = {},
    form,
    fields,
    stack
  } = {}) {
    super(message);
    this.formError = message;
    this.name = "FormError";
    this.fields = fields || Object.fromEntries(typeof form !== "undefined" ? form.entries() : []) || {};
    this.fieldErrors = fieldErrors;

    if (stack) {
      this.stack = stack;
    }
  }

}

const XSolidStartLocationHeader = "x-solidstart-location";
const LocationHeader = "Location";
const ContentTypeHeader = "content-type";
const XSolidStartResponseTypeHeader = "x-solidstart-response-type";
const XSolidStartContentTypeHeader = "x-solidstart-content-type";
const XSolidStartOrigin = "x-solidstart-origin";
const JSONResponseType = "application/json";
const redirectStatusCodes = /* @__PURE__ */ new Set([204, 301, 302, 303, 307, 308]);
function isRedirectResponse(response) {
  return response && response instanceof Response && redirectStatusCodes.has(response.status);
}
class ResponseError extends Error {
  constructor(response) {
    let message = JSON.stringify({
      $type: "response",
      status: response.status,
      message: response.statusText,
      headers: [...response.headers.entries()]
    });
    super(message);
    this.name = "ResponseError";
    this.status = response.status;
    this.headers = new Map([...response.headers.entries()]);
    this.url = response.url;
    this.ok = response.ok;
    this.statusText = response.statusText;
    this.redirected = response.redirected;
    this.bodyUsed = false;
    this.type = response.type;
    this.response = () => response;
  }
  clone() {
    return this.response();
  }
  get body() {
    return this.response().body;
  }
  async arrayBuffer() {
    return await this.response().arrayBuffer();
  }
  async blob() {
    return await this.response().blob();
  }
  async formData() {
    return await this.response().formData();
  }
  async text() {
    return await this.response().text();
  }
  async json() {
    return await this.response().json();
  }
}
function respondWith(request, data, responseType) {
  if (data instanceof ResponseError) {
    data = data.clone();
  }
  if (data instanceof Response) {
    if (isRedirectResponse(data) && request.headers.get(XSolidStartOrigin) === "client") {
      let headers = new Headers(data.headers);
      headers.set(XSolidStartOrigin, "server");
      headers.set(XSolidStartLocationHeader, data.headers.get(LocationHeader));
      headers.set(XSolidStartResponseTypeHeader, responseType);
      headers.set(XSolidStartContentTypeHeader, "response");
      return new Response(null, {
        status: 204,
        headers
      });
    } else {
      data.headers.set(XSolidStartResponseTypeHeader, responseType);
      data.headers.set(XSolidStartContentTypeHeader, "response");
      return data;
    }
  } else if (data instanceof FormError) {
    return new Response(JSON.stringify({
      error: {
        message: data.message,
        stack: data.stack,
        formError: data.formError,
        fields: data.fields,
        fieldErrors: data.fieldErrors
      }
    }), {
      status: 400,
      headers: {
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "form-error"
      }
    });
  } else if (data instanceof Error) {
    return new Response(JSON.stringify({
      error: {
        message: data.message,
        stack: data.stack,
        status: data.status
      }
    }), {
      status: data.status || 500,
      headers: {
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "error"
      }
    });
  } else if (typeof data === "object" || typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        [ContentTypeHeader]: "application/json",
        [XSolidStartResponseTypeHeader]: responseType,
        [XSolidStartContentTypeHeader]: "json"
      }
    });
  }
  return new Response("null", {
    status: 200,
    headers: {
      [ContentTypeHeader]: "application/json",
      [XSolidStartContentTypeHeader]: "json",
      [XSolidStartResponseTypeHeader]: responseType
    }
  });
}

const server = (fn) => {
  throw new Error("Should be compiled away");
};
async function parseRequest(request) {
  let contentType = request.headers.get(ContentTypeHeader);
  let name = new URL(request.url).pathname, args = [];
  if (contentType) {
    if (contentType === JSONResponseType) {
      let text = await request.text();
      try {
        args = JSON.parse(text, (key, value) => {
          if (!value) {
            return value;
          }
          if (value.$type === "headers") {
            let headers = new Headers();
            request.headers.forEach((value2, key2) => headers.set(key2, value2));
            value.values.forEach(([key2, value2]) => headers.set(key2, value2));
            return headers;
          }
          if (value.$type === "request") {
            return new Request(value.url, {
              method: value.method,
              headers: value.headers
            });
          }
          return value;
        });
      } catch (e) {
        throw new Error(`Error parsing request body: ${text}`);
      }
    } else if (contentType.includes("form")) {
      let formData = await request.formData();
      args = [formData];
    }
  }
  return [name, args];
}
async function handleServerRequest(ctx) {
  const url = new URL(ctx.request.url);
  if (server.hasHandler(url.pathname)) {
    try {
      let [name, args] = await parseRequest(ctx.request);
      let handler = server.getHandler(name);
      if (!handler) {
        throw {
          status: 404,
          message: "Handler Not Found for " + name
        };
      }
      const data = await handler.call(ctx, ...Array.isArray(args) ? args : [args]);
      return respondWith(ctx.request, data, "return");
    } catch (error) {
      return respondWith(ctx.request, error, "throw");
    }
  }
  return null;
}
const handlers = /* @__PURE__ */ new Map();
server.createHandler = (_fn, hash) => {
  let fn = function(...args) {
    let ctx;
    if (typeof this === "object" && this.request instanceof Request) {
      ctx = this;
    } else if (sharedConfig.context && sharedConfig.context.requestContext) {
      ctx = sharedConfig.context.requestContext;
    } else {
      ctx = {
        request: new URL(hash, "http://localhost:3000").href,
        responseHeaders: new Headers()
      };
    }
    const execute = async () => {
      try {
        let e = await _fn.call(ctx, ...args);
        return e;
      } catch (e) {
        if (/[A-Za-z]+ is not defined/.test(e.message)) {
          const error = new Error(e.message + "\n You probably are using a variable defined in a closure in your server function.");
          error.stack = e.stack;
          throw error;
        }
        throw e;
      }
    };
    return execute();
  };
  fn.url = hash;
  fn.action = function(...args) {
    return fn.call(this, ...args);
  };
  return fn;
};
server.registerHandler = function(route, handler) {
  handlers.set(route, handler);
};
server.getHandler = function(route) {
  return handlers.get(route);
};
server.hasHandler = function(route) {
  return handlers.has(route);
};
server.fetch = async function(route, init) {
  let url = new URL(route, "http://localhost:3000");
  const request = new Request(url.href, init);
  const handler = getApiHandler(url, request.method);
  const response = await handler.handler({ request }, handler.params);
  return response;
};

const inlineServerFunctions = ({ forward }) => {
  return async (ctx) => {
    const url = new URL(ctx.request.url);
    if (server.hasHandler(url.pathname)) {
      let contentType = ctx.request.headers.get("content-type");
      let origin = ctx.request.headers.get("x-solidstart-origin");
      let formRequestBody;
      if (contentType != null && contentType.includes("form") && !(origin != null && origin.includes("client"))) {
        let [read1, read2] = ctx.request.body.tee();
        formRequestBody = new Request(ctx.request.url, {
          body: read2,
          headers: ctx.request.headers,
          method: ctx.request.method
        });
        ctx.request = new Request(ctx.request.url, {
          body: read1,
          headers: ctx.request.headers,
          method: ctx.request.method
        });
      }
      const serverResponse = await handleServerRequest(ctx);
      let responseContentType = serverResponse.headers.get("x-solidstart-content-type");
      if (formRequestBody && responseContentType !== null && responseContentType.includes("error")) {
        const formData = await formRequestBody.formData();
        let entries = [...formData.entries()];
        return new Response(null, {
          status: 302,
          headers: {
            Location: new URL(ctx.request.headers.get("referer")).pathname + "?form=" + encodeURIComponent(JSON.stringify({
              url: url.pathname,
              entries,
              ...await serverResponse.json()
            }))
          }
        });
      }
      return serverResponse;
    }
    const response = await forward(ctx);
    if (ctx.responseHeaders.get("x-solidstart-status-code")) {
      return new Response(response.body, {
        status: parseInt(ctx.responseHeaders.get("x-solidstart-status-code")),
        headers: response.headers
      });
    }
    return response;
  };
};

const apiRoutes = ({ forward }) => {
  return async (ctx) => {
    let apiHandler = getApiHandler(new URL(ctx.request.url), ctx.request.method);
    if (apiHandler) {
      return await apiHandler.handler(ctx, apiHandler.params);
    }
    return await forward(ctx);
  };
};

const rootData = Object.values({ "/src/root.data.ts": __glob_9_0,})[0];
const dataFn = rootData ? rootData.default : undefined;
/** Function responsible for listening for streamed [operations]{@link Operation}. */

/** This composes an array of Exchanges into a single ExchangeIO function */
const composeMiddleware = exchanges => ({
  ctx,
  forward
}) => exchanges.reduceRight((forward, exchange) => exchange({
  ctx: ctx,
  forward
}), forward);
function createHandler(...exchanges) {
  const exchange = composeMiddleware([apiRoutes, inlineServerFunctions, ...exchanges]);
  return async request => {
    return await exchange({
      ctx: {
        request
      },
      // fallbackExchange
      forward: async op => {
        return new Response(null, {
          status: 404
        });
      }
    })(request);
  };
}
const docType = ssr("<!DOCTYPE html>");
var StartServer = (({
  context
}) => {
  let pageContext = context;
  pageContext.routerContext = {};
  pageContext.tags = [];

  pageContext.setStatusCode = code => {
    pageContext.responseHeaders.set("x-solidstart-status-code", code.toString());
  };

  pageContext.setHeader = (name, value) => {
    pageContext.responseHeaders.set(name, value.toString());
  }; // @ts-expect-error


  sharedConfig.context.requestContext = context;
  const parsed = new URL(context.request.url);
  const path = parsed.pathname + parsed.search;
  return createComponent(StartProvider, {
    context: pageContext,

    get children() {
      return createComponent(MetaProvider, {
        get tags() {
          return pageContext.tags;
        },

        get children() {
          return createComponent(Router, {
            url: path,

            get out() {
              return pageContext.routerContext;
            },

            data: dataFn,

            get children() {
              return [docType, createComponent(Root, {})];
            }

          });
        }

      });
    }

  });
});

var entryServer = createHandler(renderAsync(context => createComponent(StartServer, {
  context: context
}))); // TODO: create express server and add tailorx to it.
// TODO: serve dist folder as template.
// TODO: add trade as child application
// TODO: add authentication to that app
// TODO: convert invest as child application.

const name = "English";
const title = "Arcane Crypto | Platform";
const apps$1 = {
	title: "Arcane Apps"
};
const footer = {
	navigation: {
		title: "Navigation"
	},
	company: {
		title: "Company",
		people: "People",
		relations: "Investor Relations",
		privacy: "Privacy Policy"
	},
	copyright: "Copyright © {{ date }} Arcane Crypto. All rights reserved.",
	message: "Made with ❤️ in Norway",
	social: {
		title: "Follow Us"
	}
};
const cookie = {
	title: "Cookie Settings",
	description: "We use cookies in order to give you the best experience possible while visiting our website. Some of them are essential, others are optional. We won’t turn them on unless you accept.",
	link: "Learn more about them",
	manage: "Manage Cookies",
	"cancel;": "Cancel",
	accept: "Allow Cookies",
	sections: [
		{
			title: "Strictly Necessary",
			description: "These cookies are necessary for our website to function properly and can’t be disabled.",
			disabled: true
		},
		{
			title: "Product Development",
			description: "These cookies help us understand how people use our website and help us make it better.",
			disabled: false
		}
	]
};
var global = {
	"404": "404 | Page Not Found",
	name: name,
	title: title,
	apps: apps$1,
	footer: footer,
	cookie: cookie
};

const hero$1 = "Welcome to Arcane Crypto";
var landing = {
	hero: hero$1
};

const hero = "Arcane Apps";
var apps = {
	hero: hero
};

const langs = () => ({
  global,
  landing,
  apps
});

var en = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': langs
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$6 = ["<section", " class=\"margin-48\"><div id=\"error\" class=\"container\" style=\"", "\">", "</div></section>"];
var ____404_ = (() => {
  return createComponent(Public$1, {
    get children() {
      return ssr(_tmpl$$6, ssrHydrationKey(), "text-align:" + "center", escape(createComponent(NotFound$1, {})));
    }

  });
});

var ____404_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': ____404_
}, Symbol.toStringTag, { value: 'Module' }));

const Cookies = () => {
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        children: "Cookies"
      });
    }

  });
};

var cookies = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Cookies
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$5 = ["<h1", ">", "</h1>"];

const Home = () => {
  const [t] = useI18n();
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        get children() {
          return ssr(_tmpl$$5, ssrHydrationKey(), escape(t('landing.hero', {}, 'Welcome to Arcane Crypto')));
        }

      });
    }

  });
};

var index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Home
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$4 = ["<h6", ">Invest App</h6>"];

const Invest = () => {
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        get children() {
          return ssr(_tmpl$$4, ssrHydrationKey());
        }

      });
    }

  });
};

var invest = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Invest
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$3 = ["<h6", ">Login</h6>"];

const Login = () => {
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        get children() {
          return ssr(_tmpl$$3, ssrHydrationKey());
        }

      });
    }

  });
};

var login = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Login
}, Symbol.toStringTag, { value: 'Module' }));

const People = () => {
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        children: "people"
      });
    }

  });
};

var people = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': People
}, Symbol.toStringTag, { value: 'Module' }));

const Privacy = () => {
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        children: "privacy"
      });
    }

  });
};

var privacy = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Privacy
}, Symbol.toStringTag, { value: 'Module' }));

const Relations = () => {
  return createComponent(Public$1, {
    get children() {
      return createComponent(Banner, {
        children: "Relations"
      });
    }

  });
};

var relations = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Relations
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$2 = ["<div", " id=\"arcane-app\"></div>"],
      _tmpl$2$1 = ["<fragment", " async src=\"http://localhost:3000\"></fragment>"];

const Trade$1 = () => {
  return createComponent(Public$1, {
    get children() {
      return [ssr(_tmpl$$2, ssrHydrationKey()), ssr(_tmpl$2$1, ssrHydrationKey())];
    }

  });
};

var trade$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Trade$1
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$$1 = ["<h1", ">", "</h1>"];

const Apps = () => {
  const [t] = useI18n();
  return createComponent(Private, {
    get children() {
      return createComponent(Banner, {
        get children() {
          return ssr(_tmpl$$1, ssrHydrationKey(), escape(t('apps.hero', {}, 'Apps list')));
        }

      });
    }

  });
};

var index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Apps
}, Symbol.toStringTag, { value: 'Module' }));

const _tmpl$ = ["<fragment", " src=\"http://localhost:3000/app/\" async></fragment>"],
      _tmpl$2 = ["<div", "></div>"];

const Trade = () => {
  return createComponent(Private, {
    get children() {
      return [ssr(_tmpl$, ssrHydrationKey()), ssr(_tmpl$2, ssrHydrationKey())];
    }

  });
};

var trade = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  'default': Trade
}, Symbol.toStringTag, { value: 'Module' }));

export { entryServer as default };