const { injectBabelPlugin, getLoader } = require('react-app-rewired');

const rewireLess = require('react-app-rewire-less');
const rewireMobX = require('react-app-rewire-mobx');
const rewireTypescript = require('react-app-rewire-typescript');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = function override(config, env) {
  let newConfig;
  newConfig = rewireMobX(config, env);

  newConfig = rewireTypescript(config, env);

  newConfig = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], newConfig);

  newConfig.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx'];

  newConfig = tsOverride(newConfig, env);

  newConfig = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      '@normal-color': '#e6f7ff',
      '@primary-color': '#1890ff',
    },
  })(newConfig, env);

  return newConfig;
};

const tsOverride = (config, env) => {
  const tsLoader = getLoader(
    config.module.rules,
    rule => rule.loader && typeof rule.loader === 'string' && rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: 'css',
      }) ]
    })
  };

  return config;
}
