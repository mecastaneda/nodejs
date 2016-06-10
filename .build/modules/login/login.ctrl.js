'use strict';

angular.module('currencyConverterApp')
.controller('loginCtrl', ['$scope', '$http', '$rootScope', '$state',
  function($scope, $http, $rootScope, $state) {
    $scope.user;
    $scope.errorMsg = '';

    $scope.signin = function() {
      $http.post('/login', $scope.user).then( function(res) {
        $rootScope.isAuthed = true;
        $state.go('displayTransactions');
      }, function(res) {
        $scope.errorMsg = res.data.error.message;
      });
    }
  }
]);
