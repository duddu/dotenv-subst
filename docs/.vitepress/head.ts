import type { HeadConfig } from 'vitepress';

import pkg from '../../src/shared/package.js';

const themeColor = '#3dd68c';
const googleTagId = 'G-QWHYNP1ET6';

export const head: HeadConfig[] = [
  ['meta', { name: 'apple-mobile-web-app-title', content: pkg.name + ' Docs' }],
  ['meta', { name: 'application-name', content: pkg.name }],
  ['meta', { name: 'msapplication-TileColor', content: themeColor }],
  ['meta', { name: 'theme-color', content: themeColor }],
  [
    'script',
    {
      async: '',
      src: 'https://www.googletagmanager.com/gtag/js?id=' + googleTagId,
    },
  ],
  [
    'script',
    {},
    `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleTagId}');`,
  ],
];
