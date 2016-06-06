angular.module('currencyConverterApp')
.directive('login', function() {
  return {
    templateUrl: '/modules/login/login.html',
    restrict: 'E',
    controller: 'loginCtrl'
  }
});
