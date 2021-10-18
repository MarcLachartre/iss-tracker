console.log("bite");
const express = require('express');
console.log("chatte")
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.prod.js');
const compiler = webpack(config);

//////////////// Images load ////////////////

app.get('/world-map.jpeg', (req, res) => {
  res.sendFile(__dirname + '/src/images/world-map.jpeg')
})
app.get('/fusee.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/fusee.png')
})
app.get('/astronaut.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/astronaut.png')
})
app.get('/wormhole.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/wormhole.png')
})
app.get('/phone-rotation.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/phone-rotation.png')
})
app.get('/iss-social-media-image.jpg', (req, res) => {
  res.sendFile(__dirname + '/src/images/iss-social-media-image.jpg')
})

app.get('/favicon-iss-16x16.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/favicon-iss-16x16.png')
})
app.get('/favicon-iss-32x32.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/favicon-iss-32x32.png')
})
app.get('/favicon-iss-android-chrome-192x192.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/iss-favicon-android-chrome-192x192.png')
})
app.get('/favicon-iss-android-chrome-512x512.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/favicon-iss-android-chrome-512x512.png')
})
app.get('/favicon-iss-apple-touch-icon.png', (req, res) => {
  res.sendFile(__dirname + '/src/images/favicon-iss-apple-touch-icon.png')
})
/////////////////////////////////////////////

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.use(
  webpackDevMiddleware(compiler, {
    headers: (req, res, context) => {
      res.setHeader("Last-Modified", new Date());
    },
    publicPath: config.output.publicPath,
    
  })
);


// Serve the files on port || 3000.
app.listen(process.env.PORT || 3000, function () {
  console.log('App listening on port || 3000!\n');
});