define(function () {
  function AuthenticationController($scope, backendService, $navigate) {

    $scope.login = function () {
      return backendService.login($scope.server, $scope.username, $scope.password).then(function () {
        $navigate('#welcomePage');
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
    };

    $scope.loginPossible = function () {
      return $scope.server && $scope.username && $scope.password;
    };

    $scope.logout = function () {
      backendService.logout();
    };

    $scope.customer = function () {
      return backendService.authenticatedCustomer();
    };

  }

  AuthenticationController.$inject = ['$scope', 'backendService', '$navigate'];

  return AuthenticationController;
});