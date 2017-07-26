const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './client/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'app.js'
  },

  devServer: {
    hot: true,
    inline: true,
    host: 'localhost',
    port: 4000,
    historyApiFallback: true,
    contentBase: __dirname + '/public/'
  },
  module: {
    // https://velopert.com/1492
    rules: [
      /*  {
       test: /\.js$/,
       exclude: /node_modules/,
       loader: 'eslint-loader',
       enforce: 'pre',
       query: {
       confile: './.eslintrc-tmp',
       },
       }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: [
            'transform-decorators-legacy',
            'transform-class-properties',
            'transform-async-functions'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
