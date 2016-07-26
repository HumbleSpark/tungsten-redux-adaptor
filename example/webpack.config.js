const path = require('path');
const webpack = require('webpack');

// @TODO remove temp scoped npm

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'app'),
  output: {
    path: path.join(__dirname, '__build__'),
    filename: 'bundle.js',
    publicPath: '/__build__/'
  },
  resolve: {
    modulesDirectories: ['web_modules', 'node_modules', path.resolve(__dirname)],
    alias: {
      'tungsten-redux-adaptor': path.join(__dirname, '..', 'lib'),
      'tungstenjs': require.resolve('@ndreckshage/tungstenjs')
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.mustache$/, loader: path.resolve(__dirname, 'loaders/tungsten') }
    ]
  }
};
