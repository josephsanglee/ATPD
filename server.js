var express = require('express');
var request = require('request');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var port = process.env.PORT || 8080
var app = express();

//connect to Mongoose database at some point
// mongoose.connect('mongodb://localhost/poppin);

app.use(express.static(__dirname + '/client'));
app.use('/bower_components',  express.static(__dirname + '/client/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());




// get/post requests for users here


// get requests for artists from Spotify API here


// get/post requests for user favorite artists here




app.listen(port);
console.log('Listening on port', port);