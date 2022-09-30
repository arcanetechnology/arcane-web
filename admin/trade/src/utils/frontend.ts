/** @format */

import { darken, lighten } from '@mui/material';

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringToAvatar = (name: string = 'error@error.com') => {
  if (!name) {
    return {
      width: 56,
      height: 56,
    };
  }
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: 56,
      height: 56,
    },
    children: `${name.split('@')[0][0]}${name.split('@')[1][0]}`.toUpperCase(),
  };
};

export function matchRuleExpl(str: string, rule: string) {
  const escapeRegex = (s: string) =>
    s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
  rule = rule.split('*').map(escapeRegex).join('.*');
  rule = '^' + rule + '$';
  const regex = new RegExp(rule);
  return regex.test(str);
}

export const getBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

export const getHoverBackgroundColor = (color: string, mode: string) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);
