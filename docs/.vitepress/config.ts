import { defineConfig, type DefaultTheme, type PageData } from 'vitepress';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons';

import pkg from '../../src/shared/package.js';
import { head } from './head.js';
import { routes } from './routes.js';

const themeConfig: DefaultTheme.Config = {
  siteTitle: pkg.name,
  externalLinkIcon: true,
  editLink: void 0,
  search: { provider: 'local' },
  nav: [
    {
      text: 'CLI Options Reference',
      link: routes.cliOptions.link,
    },
  ],
  socialLinks: [
    { icon: 'npm', link: 'https://www.npmjs.com/package/dotenv-subst' },
    { icon: 'github', link: 'https://github.com/duddu/dotenv-subst' },
  ],
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
};

const transformPageData = (pageData: PageData): void => {
  if (typeof pageData.params?.title === 'string') {
    pageData.title = pageData.params.title;
  }
  if (pageData.frontmatter?.layout === 'home') {
    pageData.frontmatter = {
      ...pageData.frontmatter,
      hero: {
        name: pkg.name,
        tagline: pkg.description,
        ...pageData.frontmatter?.hero,
        actions: [
          {
            theme: 'brand',
            text: 'Quickstart',
            link: routes.installation.link,
          },
          {
            theme: 'alt',
            text: 'CLI Usage',
            link: routes.cliUsage.link,
          },
          ...(pageData.frontmatter?.hero?.actions || []),
        ],
      },
    };
  }
};

export default defineConfig({
  title: pkg.name,
  description: pkg.description,
  cleanUrls: true,
  lastUpdated: true,
  head,
  themeConfig,
  transformPageData,
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
    clearScreen: false,
    plugins: [
      // @ts-expect-error vite plugin
      groupIconVitePlugin({
        customIcon: {
          '.properties': 'vscode-icons:file-type-config',
          '.txt': 'vscode-icons:file-type-text',
        },
      }),
    ],
  },
});
