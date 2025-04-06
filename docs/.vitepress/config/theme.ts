import type { DefaultTheme } from 'vitepress';

import pkg from '../../../src/shared/package.js';
import { nav, socialLinks } from './nav.js';
import { routes } from '../routes.js';

export const themeConfig: DefaultTheme.Config = {
  siteTitle: pkg.name,
  externalLinkIcon: true,
  editLink: void 0,
  search: { provider: 'local' },
  nav,
  socialLinks,
  sidebar: [
    {
      text: 'Getting Started',
      items: [routes.introduction, routes.installation, routes.supportedSyntax],
    },
    {
      text: 'CLI',
      items: [routes.cliUsage, routes.cliOptions, routes.cliExamples],
    },
  ],
  footer: {
    message:
      'Released under the BSD-3-Clause <a href="https://github.com/duddu/dotenv-subst/blob/main/LICENSE" target="_blank" rel="noopener">License</a>.',
    copyright:
      'Copyright © 2025-present <a href="https://github.com/duddu" target="_blank" rel="noopener">duddu</a>',
  },
};
