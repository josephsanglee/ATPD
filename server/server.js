var express = require('express');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var middleware = require('./config/middleware.js');
var helpers = require('./config/helpers.js');
var port = process.env.PORT || 8080;
var app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/poppin');

//put middleware in separate file
middleware(app, express);

var User = require('./users/userModel.js');
var findUser = Promise.promisify(User.findOne, User);
var createUser = Promise.promisify(User.create, User);

//fetch artist data from spotify API
app.post('/api/search', function (req, res) {
  var query = req.body.name.toLowerCase().replace(/ /g, '%20').trim();
  var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=artist';

  helpers.getArtist(url, function(artist) {
    res.status(200).send(JSON.stringify(artist));
  });

});

// post request for user signin
app.post('/api/signin', function(req, res) {
  var user = req.body;

  findUser({ username: user.username })
  .then(function(currentUser) {
    if (!user) { res.status(404).send('User aint there'); }

    currentUser.comparePasswords(user.password)
    .then(function(matched) {
      if (matched) {
        res.status(200).send('Signin successful!');
      }
    });
  });

});

// post request for user signup
app.post('/api/signup', function(req, res) {
  var user = req.body;

  findUser({ username: user.username })
  .then(function(currentUser) {
    if (!user) { res.status(404).send('Invalid signup'); }

    createUser(user)
    .then(function(user) {
      if (!user) { return res.status(404).send('Invalid creation'); } 

      res.status(200).send('Successfully created!');
    });
  });
});


app.listen(port);
console.log('Listening on port', port);

module.exports = app;