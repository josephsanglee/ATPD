angular.module('poppin', [
  'poppin.services',
  'poppin.search',
  'ngRoute'
])

.config(function($routeProvider, $httpProvider) {

  $routeProvider
  .when('/search', {
    templateUrl: 'app/search/search.html',
    controller: 'SearchController'
  })
  .otherwise({
    redirectTo: '/search'
  });
});