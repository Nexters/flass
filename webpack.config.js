const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      './client/index'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/'
  },

  devServer: {
    hot: true,
    inline: true,
    host: 'localhost',
    port: 4000,
    contentBase: path.resolve(__dirname, '/public')
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
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BACK_END: JSON.stringify(process.env.BACK_END)
      }
    })
  ]
};
