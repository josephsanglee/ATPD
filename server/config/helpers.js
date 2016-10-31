//////////////SPOTIFY API REQUEST HELPERS////////////////////
var request = require('request');


var getTopTracks = function(id, cb) {
  var query = 'https://api.spotify.com/v1/artists/' + id + '/top-tracks?country=US';

  request(query, function(error, response, body) {
    if (error) { return console.log(error); }

    var tracks = JSON.parse(body).tracks;
    tracks = tracks.map(function(track) {
      return {
        name: track.name,
        albumCover: track.album.images[0].url,
        preview: track.preview_url
      };
    });

    return cb(tracks);
  });
};



var getRelatedArtists = function(id, cb) {
  var query = 'https://api.spotify.com/v1/artists/' + id + '/related-artists';

  request(query, function(error, response, body) {
    if (error) { return console.log(error); }

    var artists = JSON.parse(body).artists;
    artists = artists.map(function(artist) {
      return {
        id: artist.id,
        name: artist.name,
        image: artist.images[0].url
      };
    });

    return cb(artists.slice(0, 10));
  });
};



var getArtistData = function(url, cb) {
  var artistData = {};

  //search for artist
  request(url, function(error, response, body) {
    if (error) { return console.log(error); }

    var searchData = JSON.parse(body);

    if (searchData !== '' && response.statusCode == 200) {
      var artist = searchData.artists.items[0];
      artistData.name = artist.name;
      artistData.popularity = artist.popularity;
      artistData.image = artist.images[0].url;
      artistData.followers = artist.followers.total;

      getTopTracks(artist.id, function(topTracks) {
        artistData.topTracks = topTracks;

        getRelatedArtists(artist.id, function(relatedArtists) {
          artistData.relatedArtists = relatedArtists;

          return cb(artistData);
        });
      });
    }

  });
};


module.exports = {
  getArtist: getArtistData
};