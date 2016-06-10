  angular.module('currencyConverterApp')
  .controller('convertionsCtrl', ['$scope', 'txService',
    function ($scope, txService) {
      $scope.currencies = [];

      txService.getCurrencies().then(
        function success(res) {
          for(var currency in res.data)
            $scope.currencies.push({code:currency, name:res.data[currency]});
        },
        function fail(res) {
          console.log('FAIL to get currencies', res);
        }
      );

      $scope.doConvertion = function() {
        if(!$scope.amount || !$scope.converter1 || !$scope.converter2) return;
        txService.getLatest().then(
          function success(res) {
            console.log('converting...');
            $scope.result = ($scope.amount / res.data.rates[$scope.converter1.code]) * res.data.rates[$scope.converter2.code];
            $scope.result = Math.round($scope.result*100)/100;
          },
          function fail(res) {
            console.log('FAIL to get latests', res);
          }
        );
      };

    }
  ]);
