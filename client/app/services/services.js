angular.module('poppin.services', [])

.factory('Artists', function($http) {

  var getArtistData = function(artist) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: { name: artist }
    });
  };

  return {
    getArtistData: getArtistData
  };
});