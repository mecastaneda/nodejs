'use strict';

angular.module('currencyConverterApp')
.controller('signupCtrl', ['$scope', '$http', 'vcRecaptchaService', '$state',
function($scope, $http, vcRecaptchaService, $state) {

  $scope.user;
  $scope.errorMsg = '';

  $scope.model = {key: '6LdzvyETAAAAAAulB2x8v6GJfhMSbW43XtlHcV1u'};
  $scope.response = null;
  $scope.widgetId = null;

  $scope.setResponse = function (response) {
    console.info('Response available');
    $scope.response = response;
  };
  $scope.setWidgetId = function (widgetId) {
    console.info('Created widget ID: %s', widgetId);
    $scope.widgetId = widgetId;
  };
  $scope.cbExpiration = function() {
    console.info('Captcha expired. Resetting response object');
    vcRecaptchaService.reload($scope.widgetId);
    $scope.response = null;
  };

  $scope.signup = function() {
      $http.post('/register', $scope.user).then( function(res) {
      $state.go('login');
    }, function(res) {
      console.log('res', res);
      vcRecaptchaService.reload($scope.widgetId);
      $scope.errorMsg = res.data.message;
    });
  }
}
]);
