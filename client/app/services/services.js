angular.module('poppin.services', [])

.factory('Artists', function($http) {

  var getArtistData = function(artist) {
    return $http({
      method: 'POST',
      url: '/api/search',
      data: { name: artist }
    });
  };

  var signin = function(user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    });
  }
  
  var signup = function(user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    });
  }

  return {
    getArtistData: getArtistData,
    signin: signin,
    signup: signup
  };
});