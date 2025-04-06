import type { DefaultTheme } from 'vitepress';

import pkg from '../../src/shared/package.js';
import { routes } from './routes.js';

const githubRepoUrl = 'https://github.com/duddu/dotenv-subst';
const npmPackageUrl = 'https://www.npmjs.com/package/dotenv-subst';

export const nav: DefaultTheme.NavItem[] = [
  {
    text: 'CLI Options Reference',
    link: routes.cliOptions.link,
  },
  {
    text: 'v' + pkg.version,
    items: [
      {
        text: 'Release Notes',
        link: githubRepoUrl + '/releases/tag/v' + pkg.version,
      },
    ],
  },
];

export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'npm', link: npmPackageUrl },
  { icon: 'github', link: githubRepoUrl },
];
