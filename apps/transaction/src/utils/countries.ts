/** @format */

import countries from '../assets/countries.json';

export const all = () => {
  return countries.map((c) => c.symbol);
};

export const symbol = (name: string) => {
  const newName = name.toLowerCase().trim();
  let cSymbol;
  countries.map((c) => {
    const countryArray = c.currency.split(' ');
    const ccyName = countryArray.pop()?.toLowerCase().trim();
    const ccyAbbr = c.abbreviation.toLowerCase();
    const countryName = countryArray.join(' ').toLowerCase().trim();

    if (newName === ccyName || newName === countryName || newName === ccyAbbr) {
      cSymbol = c.symbol;
    }
  });
  return cSymbol;
};
