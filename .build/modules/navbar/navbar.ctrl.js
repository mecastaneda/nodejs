angular.module('currencyConverterApp')
.controller('navbarCtrl', ['$scope', '$rootScope','$location', '$state', '$cookies',
  function($scope, $rootScope, $location, $state, $cookies) {
    $scope.path = $location.path();
    $scope.isAuthed = $rootScope.isAuthed;
    $rootScope.$on('$locationChangeStart', function() {
        $scope.path = $location.path();
    });
    $scope.logout = function() {
      $cookies.remove('userId');
      $cookies.remove('connect.sid');
      $rootScope.isAuthed = false;
      $state.go('login');
    };
  }
]);
