const webpack = require('webpack');

module.exports = function(options) {
  return {
    // HMRが動作しない場合は以下をコメントアウトする
    // watchOptions: {
    //   // Delay the rebuild after the first change
    //   aggregateTimeout: 300,
    //   // Poll using interval (in ms, accepts boolean too)
    //   poll: 1000
    // },
    devServer: {
      historyApiFallback: true,

      hot: true,
      inline: true,

      stats: 'errors-only',

      host: options.host,
      port: options.port
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  }
};
