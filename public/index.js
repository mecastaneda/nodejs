angular.module('currencyConverterApp', ['ui.router', 'ngCookies', 'reCAPTCHA'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', 'reCAPTCHAProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider, reCAPTCHAProvider) {

    // Routing Configuration
    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('login', {
        url: "/login",
        template: "<login></login>"
    })
      .state('signup', {
        url: "/signup",
        template: "<signup></signup>"
    })
      .state('displayTransactions', {
        url: "/displayTransactions",
        template: "<display-transactions></display-transactions>"
    })
      .state('addTransaction', {
        url: "/addTransaction",
        template: "<add-transaction></add-transaction>"
    });

    // CSRF Configuration
    $httpProvider.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
    $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';

    // reCaptcha Configuration
    reCAPTCHAProvider.setPublicKey('6LdzvyETAAAAAAulB2x8v6GJfhMSbW43XtlHcV1u');
    reCAPTCHAProvider.setOptions({
        theme: 'light'
    });
}])
.controller('mainCtrl', ['$scope', function($scope) {

}]);
