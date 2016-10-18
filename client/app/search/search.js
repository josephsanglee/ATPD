angular.module('poppin.search', [])

.controller('SearchController', function($scope, $sce, Artists) {
  $scope.artist = {};
  $scope.artistData;
  $scope.relatedArtists;
  $scope.topTracks;
  $scope.tagline;
  $scope.audio;

  $scope.submitArtist = function(name) {
    artistName = name || $scope.artist.name;
    
    Artists.getArtistData(artistName)
    .then(function(artistData) {
      $scope.artistData = artistData.data;
      $scope.relatedArtists = artistData.data.relatedArtists;
      $scope.topTracks = artistData.data.topTracks;
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

    if ($scope.audio) {
      $scope.audio.pause();
    }
    
    $scope.artist.name = '';
  };

  $scope.playTrack = function(trackUrl) {
    if ($scope.audio) {
      $scope.audio.pause();
    }
    $scope.audio = new Audio(trackUrl);
    $scope.audio.play();
  };
});