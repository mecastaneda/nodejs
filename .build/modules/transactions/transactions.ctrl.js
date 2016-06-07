angular.module('currencyConverterApp')
.controller('transactionsCtrl', ['$scope', '$http',
  function($scope, $http) {
    $scope.transaction;
    $scope.transactions = [];

    $scope.sendTransaction = function() {
      $http.post('/transactions', $scope.transaction)
      .then(function(res) {
        console.log('OK', res);
        $scope.getTransactions();
      }, function(res) {
        console.log('not OK', res);
      });
    };

    $scope.getTransactions = function() {
      $http.get('/transactions')
      .then(function(res) {
        console.log('got transes', res);
      }, function(res) {
        console.log('err', res);
      });
    };
    $scope.getTransactions();
  }
]);
