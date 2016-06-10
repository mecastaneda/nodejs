angular.module('currencyConverterApp', ['ui.router', 'ngCookies', 'vcRecaptcha'])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
  function($stateProvider, $urlRouterProvider, $httpProvider) {

    // Routing Configuration
    $urlRouterProvider.otherwise("/login");
    $stateProvider
      .state('login', {
        url: "/login",
        templateUrl: "/modules/login/login.html",
    })
      .state('signup', {
        url: "/signup",
        templateUrl: "/modules/signup/signup.html"
    })
      .state('displayTransactions', {
        url: "/displayTransactions",
        templateUrl: "/modules/transactions/transactions-viewer.html"
    })
      .state('addTransaction', {
        url: "/addTransaction",
        templateUrl: "/modules/transactions/transaction-form.html"
    })
      .state('convertions', {
        url: "/convertions",
        templateUrl: '/modules/convertions/convertions.html'
    });

    // CSRF Configuration
    $httpProvider.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
    $httpProvider.defaults.xsrfCookieName = 'XSRF-TOKEN';

}])
.run(['$rootScope', '$urlRouter', '$state', '$location', '$cookies',
  function($rootScope, $urlRouter, $state, $location, $cookies) {
    if($cookies.get('userId'))
      $rootScope.isAuthed = true;
    $rootScope.$on('$locationChangeSuccess', function(evt) {
      evt.preventDefault();
      var requirements = $rootScope.isAuthed || $location.path() == '/signup';
      if(requirements) {
        $urlRouter.sync();
      } else {
        $state.go('login');
      }
    });
  }
])
