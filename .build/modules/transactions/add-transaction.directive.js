angular.module('currencyConverterApp')
.directive('addTransaction', function() {
  return {
    templateUrl: '/modules/transactions/transaction-form.html',
    restrict: 'E',
    controller: 'transactionsCtrl'
  };
});
