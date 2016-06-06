angular.module('currencyConverterApp')
.directive('signup', function() {
  return {
    templateUrl: '/modules/signup/signup.html',
    restrict: 'E',
    controller: 'signupCtrl'
  }
});
