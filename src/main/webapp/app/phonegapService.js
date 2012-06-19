define(function () {
  function phonegapServiceFactory($q, $rootScope, $exceptionHandler) {
    function scan() {
      var defer = $q.defer();
      cordova.exec(createsSanSuccess(defer), createScanError(defer), "BarcodePlugin", "scan", []);
      return defer.promise;
    }

    function createsSanSuccess(defer) {
      return function(data) {
        $rootScope.$apply(function() {
          defer.resolve(data.text);
        });
      }
    }

    function createScanError(defer) {
      return function(data) {
        $rootScope.$apply(function() {
          defer.reject(data);
        });
      }
    }

    return {
      scan:scan
    }
  }

  phonegapServiceFactory.$inject = ["$q", "$rootScope", "$exceptionHandler"];

  return phonegapServiceFactory;
});