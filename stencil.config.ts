import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  namespace: 'smart-search',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'bundle',
      generateTypeDeclarations: true,
      minify: true,
      externalRuntime: false,
    },
    {
      type: 'www',
      serviceWorker: null,
    },
    // Framework output targets will be configured after creating the directories
    // React, Angular, Vue output targets will be added in separate config files
  ],
  testing: {
    browserHeadless: 'new',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  },
  buildEs5: 'prod',
  enableCache: true,
  devServer: {
    openBrowser: false,
    port: 3333,
  },
};
