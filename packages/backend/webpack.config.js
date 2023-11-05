const path = require('path');
const getModules = require('./webpack/getModules.js');
const { DefinePlugin } = require('webpack');
const { getEnvironmentVariables } = require('@sensus/webpack');

module.exports = {
  mode: 'production',
  optimization: {
    minimize: false,
  },
  entry: getModules('./src/lambdas'),
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  target: 'node',
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
  },
  plugins: [
    new DefinePlugin(getEnvironmentVariables().stringified),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'commonjs',
    filename: '[name].js',
  },
};
