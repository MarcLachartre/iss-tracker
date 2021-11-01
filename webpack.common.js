const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/js/index.js',
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'ISS Tracker',
      template: './src/html/index.html',
      favicon: "src/images/space-station-icon.png",
      meta: {
        'title': {name: 'title', content: 'ISS Tracker'},
        'description': { name: 'description', content: "Follow the International Space Station's journey in real time around the world and see if it is currently crusing (400+ kms) above your head!"},
        'keyword': { name: 'keywords', content: 'ISS International Space Station Live Tracking' },
        'og:title': { property: 'og:title', content: 'ISS Tracker' },
        'og:description': { property: 'og:description', content: "Follow the International Space Station's journey in real time around the world and see if it is currently crusing (400+ kms) above your head!" },
        'og:type': { property: 'og:type', content: 'website' },
        'og:url': { property: 'og:url', content: 'https://www.isstracker.live' },
        'og:image': { property: 'og:image', content: '/iss-social-media-image.jpg' },
        'twitter:card': { name: 'twitter:card', content: 'summary_large_image' },
        'twitter:title': { name: 'twitter:title', content: 'ISS Tracker' },
        'twitter:description': { name: 'twitter:description', content: "Follow the International Space Station's journey in real time around the world and see if it is currently crusing (400+ kms) above your head!" },
        'twitter:image': { name: 'twitter:image', content: '/iss-social-media-image.jpg' }
      }
    }),
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