import { defineLoader } from 'vitepress';

import { routes } from './routes.js';

export type RoutesConfigData = typeof routes;

declare const data: RoutesConfigData;
export { data };

export default defineLoader({
  load: (): RoutesConfigData => routes,
});
