angular.module('currencyConverterApp')
.controller('navbarCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location) {
  $scope.path = $location.path();
  $rootScope.$on('$locationChangeStart', function() {
      $scope.path = $location.path();
  });
}])
.directive('navbar', function() {
  return {
    templateUrl: '/modules/navbar/navbar.html',
    restrict: 'E',
    controller: 'navbarCtrl'
  }
});
