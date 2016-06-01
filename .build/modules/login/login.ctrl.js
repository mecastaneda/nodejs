'use strict';

angular.module('currencyConverterApp')
.controller('loginCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.user;
  $scope.errorMsg = '';

  $scope.signin = function() {
    $http.post('/login', $scope.user).then( function(res) {
      console.log('all ok', res);
    }, function(res) {
      console.log('not ok', res);
    });
  }
}]);
