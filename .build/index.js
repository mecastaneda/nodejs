angular.module('currencyConverterApp', ['ui.router', 'ngCookies'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('login', {
        url: "/login",
        template: "<login></login>"
    });
    $httpProvider.interceptors.push("csrfInterceptor");
    $httpProvider.defaults.xsrfHeaderName = '_csrf';
    $httpProvider.defaults.xsrfCookieName = 'x-xsrf-token';
}])
.controller('mainCtrl', ['$scope', function($scope) {
  console.log('hi from main ctrl');
  $scope.greeting = "hello mundo";
}])
.factory('csrfInterceptor', ['$cookies', '$rootScope', '$q', function($cookies, $rootScope, $q) {
  return {
    request: function(config) {
      var csrf = $cookies.get('XSRF-TOKEN');
      console.log('csrf from cookie', csrf);

      if(config.data) {
          config.data._csrf = csrf;
          config.headers._csrf = csrf;
      }

      console.log('config', config);

      return config;
    },
    requestError: function(response) {
      console.log('got req error');
      return $q.reject(response);
    }
  }
}]);
