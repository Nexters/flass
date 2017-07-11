const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'react-hot-loader/patch',
      './client/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './public/js'),
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
       configFile: './.eslintrc-tmp',
       },
       }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
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
