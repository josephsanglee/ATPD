angular.module('poppin.search', [])

.controller('SearchController', function($scope, Artists) {
  $scope.artist = {};
  $scope.artistData;
  $scope.tagline;

  $scope.submitArtist = function() {
    artistName = $scope.artist.name;
    
    Artists.getArtist(artistName)
    .then(function(artist) {
      $scope.artistData = artist.data;
      var pop = $scope.artistData.popularity;

      if (pop > 90) {
        $scope.tagline = "Hella poppin'";
      } else if (pop > 80) {
        $scope.tagline = "Poppin'";
      } else if (pop > 70) {
        $scope.tagline = "Kinda poppin'";
      } else if (pop > 60) {
        $scope.tagline = "Not really poppin'";
      } else if (pop > 50) {
        $scope.tagline = "Not poppin'";
      } else {
        $scope.tagline = "Should probably quit at some point";
      }
    });

    $scope.artist.name = '';
  };
});