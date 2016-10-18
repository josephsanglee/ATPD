angular.module('poppin.services', [])

.factory('Artists', function($http) {

  //performs a POST request to the server
  var getArtist = function(artist) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: { name: artist }
    });
  };

  return {
    getArtist: getArtist
  };
});