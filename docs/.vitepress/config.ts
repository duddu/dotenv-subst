import { defineConfig } from 'vitepress';
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from 'vitepress-plugin-group-icons';

import pkg from '../../src/shared/package.js';
import { sidebarItems } from './routes.js';

export default defineConfig({
  title: pkg.name,
  description: pkg.description,
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    siteTitle: pkg.name,
    externalLinkIcon: true,
    editLink: void 0,
    nav: [
      {
        text: 'CLI Options Reference',
        link: sidebarItems.cliOptions.link,
      },
    ],
    sidebar: [
      {
        text: 'Getting Started',
        items: [
          sidebarItems.introduction,
          sidebarItems.installation,
          sidebarItems.supportedSyntax,
        ],
      },
      {
        text: 'CLI',
        items: [
          sidebarItems.cliUsage,
          sidebarItems.cliOptions,
          sidebarItems.cliExamples,
        ],
      },
    ],
    socialLinks: [
      { icon: 'npm', link: 'https://www.npmjs.com/package/dotenv-subst' },
      { icon: 'github', link: 'https://github.com/duddu/dotenv-subst' },
    ],
  },
  head: [
    [
      'meta',
      { name: 'apple-mobile-web-app-title', content: pkg.name + ' Docs' },
    ],
    ['meta', { name: 'application-name', content: pkg.name }],
    ['meta', { name: 'msapplication-TileColor', content: '#3dd68c' }],
    ['meta', { name: 'theme-color', content: '#3dd68c' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=G-QWHYNP1ET6',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-QWHYNP1ET6');`,
    ],
  ],
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  vite: {
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
  transformPageData(pageData) {
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
              link: sidebarItems.installation.link,
            },
            {
              theme: 'alt',
              text: 'CLI Usage',
              link: sidebarItems.cliUsage.link,
            },
            ...(pageData.frontmatter?.hero?.actions || []),
          ],
        },
      };
    }
  },
});
