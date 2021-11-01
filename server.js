const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

//////////////// Images load ////////////////

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