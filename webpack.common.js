const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const Favicon = require('favicons')
const source = "src/images/space-station-icon.png";
// const configuration = {
//   path: "/", // Path for overriding default icons path. `string`
//   background: "#fff", // Background colour for flattened icons. `string`
//   theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
//   appleStatusBarStyle: "black-translucent", // Style for Apple status bar: "black-translucent", "default", "black". `string`
//   display: "standalone", // Preferred display mode: "fullscreen", "standalone", "minimal-ui" or "browser". `string`
//   orientation: "any", // Default orientation: "any", "natural", "portrait" or "landscape". `string`
//   icons: {
//     android: true,
//     appleIcon: true, 
//     // appleStartup: true,  
//     // coast: true, 
//     favicons: true, 
//     firefox: true, 
//     windows: true, 
//     // yandex: true, 
//   },
// }

// callback = function (error, response) {
//   if (error) {
//     console.log(error.message); // Error description e.g. "An unknown error has occurred"
//     return;
//   }
//   console.log(response.images); // Array of { name: string, contents: <buffer> }
//   console.log(response.files); // Array of { name: string, contents: <string> }
//   console.log(response.html); // Array of strings (html elements)
// };

// Favicon(source, configuration, callback);

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
    new FaviconsWebpackPlugin("src/images/space-station-icon.png"),
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.css$/i,
        use: [ 'style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },


  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
},
};