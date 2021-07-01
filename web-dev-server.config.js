import {legacyPlugin} from '@web/dev-server-legacy';

export default {
  appIndex: 'dev/index.html',
  open: true,
  watch: true,
  nodeResolve: true,
  preserveSymlinks: true,
  plugins: [
    legacyPlugin({
      polyfills: {
        webcomponents: false,
      },
    }),
  ],
};
