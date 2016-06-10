angular.module('currencyConverterApp').
factory('txService', ['$http', function ($http) {
  var app_id;

  function getId() {
    return $http.get('/transactions/app_id').then(
      function success(res) {
        app_id = res.data;
      },
      function fail(res) {
        console.log('Error, could not get app_id', res);
      }
    );
  }

  function _getCurrencies() {
    return $http.jsonp('https://openexchangerates.org/api/currencies.json'+
                        '?app_id='+app_id+'&callback=JSON_CALLBACK');
  }

  function _getLatest() {
    return $http.jsonp('https://openexchangerates.org/api/latest.json'+
                        '?app_id='+app_id+'&callback=JSON_CALLBACK');
  }

  return {
    getCurrencies: function() {
      if(!app_id) {
        return getId().then(
          function success(res) {
            if(!app_id) return;
            return _getCurrencies();
          }
        );
      } else
        return _getCurrencies();
    },

    getLatest: function(base) {
      if(!app_id) {
        return getId().then(
          function success(res) {
            if(!app_id) return;
            return _getLatest();
          }
        );
      } else
        return _getLatest();
    }
  }
}]);
