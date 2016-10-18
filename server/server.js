var express = require('express');
var mongoose = require('mongoose');
var middleware = require('./config/middleware.js');
var helpers = require('./config/helpers.js');
var port = process.env.PORT || 8080
var app = express();


mongoose.connect('mongodb://localhost/poppin');

middleware(app, express);


//fetch artist data from spotify API
app.post('/api/search', function (req, res) {
  var query = req.body.name.toLowerCase().replace(/ /g, '%20').trim();
  var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist';

  helpers.getArtist(url, function(artist) {
    console.log(artist);
    res.status(200).send(JSON.stringify(artist));
  });

});

// post request for user signin

// post request for user signup

// get/post requests for user favorite artists here




app.listen(port);
console.log('Listening on port', port);

module.exports = app;