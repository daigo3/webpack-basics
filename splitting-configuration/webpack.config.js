const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const devServer = require('./webpack/dev-server');
const setupCss = require('./webpack/setup-css');

const PATHS = {
  app: path.join(__dirname, 'app'),
  style: path.join(__dirname, 'app', 'main.css'),
  build: path.join(__dirname, 'build')
};

const common = {
  entry: {
    app: PATHS.app,
    style: PATHS.style
  },

  output: {
    path: PATHS.build,
    filename: '[name].js' // entryで指定したキーに対応
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo'
    })
  ]
};

var config;

switch(process.env.npm_lifecycle_event) {
  case 'build':
    config = merge(common,
      setupCss(PATHS.style)
    );
  default:
    config = merge(
      common,
      setupCss(PATHS.style),
      devServer({ host: process.env.HOST, port: process.env.PORT })
    );
}

module.exports = validate(config);
