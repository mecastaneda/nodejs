angular.module('currencyConverterApp')
.controller('transactionsCtrl', ['$scope', '$http', 'txService',
  function($scope, $http, txService) {
    $scope.transaction;
    $scope.transactions = [];
    $scope.currencies = [];

    txService.getCurrencies().then(
      function success(res) {
        for(var currency in res.data)
          $scope.currencies.push({
            code: currency,
            name: res.data[currency],
            full: currency + ' - ' + res.data[currency]
          });
      },
      function fail(res) {
        console.log('FAIL to get currencies', res);
      }
    );

    $scope.$watch('converter', function(base) {
      if(!base) return;

      txService.getLatest().then(
        function success(res) {
          for(var tx of $scope.transactions)
            tx.exchange = (tx.amount / res.data.rates[tx.currency]) * res.data.rates[base.code];
        },
        function fail(res) {
          console.log('FAIL to get latests', res);
        }
      );
    });

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
        $scope.transactions = res.data.transactions;
      }, function(res) {

      });
    };
    $scope.getTransactions();
  }
])
.filter('symbolizer', function() {
  return function(input, currency) {
    if(!input && input !== 0)
      return '';
    var symbs = {USD:'$', EUR:'€', CAD:'$', MXN:'$', CNY:'元', INR:'₹'};
    var sym = symbs[currency] || '$';
    return sym+input+' '+currency;
  };
});
