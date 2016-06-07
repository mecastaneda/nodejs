angular.module('currencyConverterApp')
.directive('displayTransactions', function() {
  return {
    templateUrl: '/modules/transactions/transactions-viewer.html',
    restrict: 'E',
    controller: 'transactionsCtrl'
  };
});
