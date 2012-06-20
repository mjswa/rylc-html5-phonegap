define(function () {
  function phonegapServiceFactory($q, $rootScope) {
    function scan() {
      var defer = $q.defer();

      function success(data) {
        $rootScope.$apply(function() {
          defer.resolve(data);
        });
      }
      function error(message) {
        $rootScope.$apply(function() {
          defer.reject(message);
        });
      }

      cordova.exec(success, error, "BarcodePlugin", "scan", []);
      return defer.promise;
    }

    return {
      scan:scan
    }
  }

  phonegapServiceFactory.$inject = ["$q", "$rootScope"];

  return phonegapServiceFactory;
});