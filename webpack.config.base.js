/**
 * @fileOverview Webpack basic configuration file.
 */

'use strict';

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './client/App.js',
  },

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    inline: true,
    host: '0.0.0.0',
    port: 4000,
    historyApiFallback: true,
    contentBase: __dirname + '/public/'
  },
  devtool: 'source-map',
  module: {
    // https://velopert.com/1492
    rules: [
    /*  {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        query: {
          configFile: './.eslintrc',
        },
      }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
