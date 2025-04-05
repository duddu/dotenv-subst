import { defineLoader } from 'vitepress';

import { sidebarItems } from './routes.js';

export type SidebarItemsData = typeof sidebarItems;

declare const data: SidebarItemsData;
export { data };

export default defineLoader({
  load: (): SidebarItemsData => sidebarItems,
});
