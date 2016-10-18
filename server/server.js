var express = require('express');
var request = require('request');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080
var app = express();

//connect to Mongoose database at some point
// mongoose.connect('mongodb://localhost/poppin');

app.use(express.static(__dirname + '/../client'));
app.use('/bower_components',  express.static(__dirname + '/../client/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());


//fetch artist data from spotify API
app.post('/api/search', function (req, res) {
  
  var query = req.body.name.toLowerCase().replace(/ /g, '%20').trim();
  var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist';

  request(url, function(error, response, body) {
    if (error) { res.status(404).send(error); }

    var searchData = JSON.parse(body);
    //response code 200 means the data was successfully retrieved
    if (response.statusCode == 200) {
      var artistData = searchData.artists.items[0];

      var artist = {
        id: artistData.id,
        name: artistData.name,
        popularity: artistData.popularity,
        image: artistData.images[0].url,
        followers: artistData.followers.total
      }

      console.log('sending artist data');
      console.log(artist);
      res.status(200).send(JSON.stringify(artist));
    }
  });
});

// get/post requests for users here

// get/post requests for user favorite artists here




app.listen(port);
console.log('Listening on port', port);