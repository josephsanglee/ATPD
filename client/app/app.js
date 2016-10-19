angular.module('poppin', [
  'poppin.services',
  'poppin.login',
  'poppin.search',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {

  $routeProvider
  .when('/search', {
    templateUrl: 'app/search/search.html',
    controller: 'SearchController'
  })
  .when('/signin', {
    templateUrl: 'app/login/signin.html',
    controller: 'LoginController'
  })
  .when('/signup', {
    templateUrl: 'app/login/signup.html',
    controller: 'LoginController'
  })
  .otherwise({
    redirectTo: '/search'
  });
});