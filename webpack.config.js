const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// importing a new type of asset (.csv, .json etc...) requires configuration, cf https://webpack.js.org/guides/asset-management/
module.exports = {
  mode: 'development',

  entry: {
    index: './src/js/index.js',
  },

  devServer: {
    static: './dist',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development - ISS Tracker',
      template: './src/html/index.html'
    }),
  ],

  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};