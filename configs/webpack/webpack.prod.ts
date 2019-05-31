import { LoaderOptionsPlugin, Configuration } from 'webpack';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const prod: Configuration = {
  mode: 'production',
  plugins: [
    new LoaderOptionsPlugin({
      debug: false,
    }),
  ],
};

module.exports = merge(baseConfig, prod);
