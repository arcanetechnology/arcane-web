/** @format */

import { Button } from '@arcane-web/alchemy-solid';
import { Dynamic } from 'solid-js/web';
import { createEffect, createSignal, Component, onMount } from 'solid-js';

// Theme toggle should get the local storage state incase there is some.
// Theme Toggle should be write to that localstorage. in essence, accessing entries and updating entries in a localstorage is a service.
// arcane needs its own icon pack I suppose?
type Theme = 'light' | 'dark';
const toggle: Record<Theme, Theme> = {
  light: 'dark',
  dark: 'light',
};

const Light = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fill-rule="evenodd"
      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
      clip-rule="evenodd"
    />
  </svg>
);

const Dark = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );
};

const icons = {
  light: Light,
  dark: Dark,
};

const ThemeToggle: Component = () => {
  const [theme, setTheme] = createSignal<Theme>('light');

  onMount(() => {
    if (import.meta.env.SSR) return null;
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme') as Theme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  });

  createEffect(() => {
    const root = document.documentElement;
    if (theme() === 'light') {
      root.classList.remove('darkmode');
    } else {
      root.classList.add('darkmode');
    }
  });

  const themeChangeHandler = () => {
    const newTheme = toggle[theme()];
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <Button
      name="theme-toggle"
      title={'Toggle theme'}
      aria-label={`Use ${theme()} theme`}
      onClick={themeChangeHandler}
      variant="tertiary"
      id="theme-toggle"
    >
      <Dynamic component={icons[theme()]} />
    </Button>
  );
};

export default ThemeToggle;
