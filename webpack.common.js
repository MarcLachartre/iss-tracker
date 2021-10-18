const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// importing a new type of asset (.csv, .json etc...) requires configuration, cf https://webpack.js.org/guides/asset-management/
module.exports = {
  entry: {
    index: './src/js/index.js',
  },


  plugins: [
    new HtmlWebpackPlugin({
      title: 'ISS Tracker',
      template: './src/html/index.html'
    }),
    new MiniCssExtractPlugin()
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
        test: /\.(sass|less|css)$/,
        use: [  MiniCssExtractPlugin.loader, 'css-loader','style-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
    ],
  },
};