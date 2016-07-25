import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import WebpackConfig from './webpack.config';
import path from 'path';

const webpackOpts = {
  publicPath: '/__build__/',
  stats: { colors: true },
};

const serve = (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
};

const serverStarted = () => {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop');
};

express()
  .use(webpackDevMiddleware(webpack(WebpackConfig), webpackOpts))
  .use(express.static(__dirname))
  .get('*', serve)
  .listen(8080, serverStarted);
