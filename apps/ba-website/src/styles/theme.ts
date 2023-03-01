// Controls the sanity studio theming

import { buildLegacyTheme } from 'sanity';
const props = {
  '--my-white': '#ffffff',
  '--my-black': '#1a1a1a',
  '--ba-brand': '#50C878',
  '--my-red': '#db4437',
  '--my-yellow': '#f4b400',
  '--my-green': '#0f9d58',
};
export const myTheme = buildLegacyTheme({
  // Base theme colors
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': '#666',
  '--gray-base': '#666',

  '--component-bg': props['--my-black'],
  '--component-text-color': props['--my-white'],

  '--brand-primary': props['--ba-brand'],

  // Default button
  '--default-button-color': '#666',
  '--default-button-primary-color': props['--ba-brand'],
  '--default-button-success-color': props['--my-green'],
  '--default-button-warning-color': props['--my-yellow'],
  '--default-button-danger-color': props['--my-red'],

  // State
  '--state-info-color': props['--my-green'],
  '--state-success-color': props['--ba-brand'],
  '--state-warning-color': props['--my-yellow'],
  '--state-danger-color': props['--my-red'],

  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--ba-brand'],
  // '--font-family-base': 'SF Pro Text',
});
