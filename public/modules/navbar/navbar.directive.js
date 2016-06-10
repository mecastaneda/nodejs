angular.module('currencyConverterApp')
.directive('navbar', function() {
  return {
    restrict: 'E',
    templateUrl: '/modules/navbar/navbar.html',
    controller: 'navbarCtrl'
  };
});
