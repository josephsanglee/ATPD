angular.module('poppin.login', [])

.controller('LoginController', function($scope, $location, Login) {
  $scope.submitSignin = function() {
    Login.signin({
      username: $scope.username,
      password: $scope.password
    })
    .then(function(response) {
      console.log(response);

      if (response.status === 200) {
        $location.path('/search');
      }
    });

    $scope.username = '';
    $scope.password = '';
  };

  $scope.submitSignup = function() {
    Login.signup({
      username: $scope.username,
      password: $scope.password
    })
    .then(function(response) {
      if (response.status === 200) {
        $location.path('/search');
      }
    });

    $scope.username = '';
    $scope.password = '';
  };
});