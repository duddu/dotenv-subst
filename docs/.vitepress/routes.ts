import type { DefaultTheme } from 'vitepress';

import { cliExamplesSidebarItems } from '../cli-examples/[example].paths.js';

export const sidebarItems = {
  introduction: {
    text: 'Introduction',
    link: '/introduction',
  },
  installation: {
    text: 'Installation',
    link: '/installation',
  },
  supportedSyntax: {
    text: 'Supported Syntax',
    link: '/supported-syntax',
  },
  cliUsage: {
    text: 'Usage',
    link: '/cli-usage',
  },
  cliOptions: {
    text: 'Options',
    link: '/cli-options',
  },
  cliExamples: {
    text: 'Examples',
    base: '/cli-examples',
    link: '/',
    collapsed: false,
    items: cliExamplesSidebarItems,
  },
} satisfies Record<string, DefaultTheme.SidebarItem>;
