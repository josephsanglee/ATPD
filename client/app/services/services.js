angular.module('poppin.services', [])

.factory('Artists', function($http) {

  var getArtist = function(artist) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: artist
    }).then(function(artist) {
      console.log(artist);
    });
  };

  return {
    getArtist: getArtist
  };
});