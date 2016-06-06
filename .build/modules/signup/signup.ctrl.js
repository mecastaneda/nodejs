'use strict';

angular.module('currencyConverterApp')
.controller('signupCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.user;
  $scope.errorMsg = '';

  $scope.signup = function() {
    $http.post('/register', $scope.user).then( function(res) {
      console.log('all ok', res);
    }, function(res) {
      $scope.errorMsg = res.data.error.message;
    });
  }
}]);
