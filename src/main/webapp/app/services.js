define(["angular", "app/utilsService", "app/backendService", "app/phonegapService", "app/rentalService"],
  function (angular, utilsServiceFactory, backendServiceFactory, phonegapServiceFactory, rentalServiceFactory) {

  function configureHttp($httpProvider) {
    $httpProvider.defaults.headers.post = {'Content-Type':'application/json'};
  }
  configureHttp.$inject = ["$httpProvider"];

  var module = angular.module("rylc-services", []);
  module.config(configureHttp);
  module.factory("utilsService", utilsServiceFactory);
  module.factory("backendService", backendServiceFactory);
  module.factory("phonegapService", phonegapServiceFactory);
  module.factory("rentalService", rentalServiceFactory);

});
