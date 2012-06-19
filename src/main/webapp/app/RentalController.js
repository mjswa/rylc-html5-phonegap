define(function () {
  function RentalController($scope, rentalService, backendService, utilsService, phonegapService) {
    var SUCCESS_MESSAGE = "Bestellung erfolgreich entgegengenommen.";

    $scope.clearMessages = function () {
      $scope.successMessage = null;
      $scope.errorMessage = null;
    };

    $scope.navigateTo = function(url) {
      utilsService.embeddingAwareNavigate(url);
    };

    $scope.prefetchMasterData = function () {
      backendService.carTypesBackground();
      backendService.citiesBackground();
    };

    $scope.initRental = function () {
      $scope.errorMessage = null;
      $scope.successMessage = null;
      $scope.startDate = new Date();
      $scope.endDate = new Date();
      $scope.maxPrice = 100;
      $scope.endDate.setDate($scope.startDate.getDate() + 1);
      backendService.cities().then(function (cities) {
        $scope.cities = cities;
        $scope.city = cities[0];
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
      backendService.carTypes().then(function (carTypes) {
        $scope.carTypes = carTypes;
        $scope.carType = carTypes[0];
      }, function (errorMessage) {
        $scope.errorMessage = errorMessage;
      });
      $scope.navigateTo('rental1Page');
    };

    $scope.searchAvailableCars = function () {
      return backendService.availableCars($scope.city.id, $scope.startDate, $scope.endDate, $scope.maxPrice).then(
        function (cars) {
          $scope.availableCars = cars;
          $scope.navigateTo("rental2Page");
        }, function (errorMessage) {
          $scope.errorMessage = errorMessage;
        });
    };

    $scope.totalPrice = function () {
      if ($scope.car) {
        return rentalService.totalPrice($scope.car.price, $scope.startDate, $scope.endDate);
      } else {
        return 0;
      }
    };

    $scope.selectCar = function (car) {
      $scope.car = car;
      $scope.navigateTo('rental3Page');
    };

    $scope.rentCar = function () {
      return backendService.rentCar($scope.car.id, $scope.startDate, $scope.endDate).then(
        function (rental) {
          $scope.rental = rental;
          $scope.successMessage = SUCCESS_MESSAGE;
          $scope.navigateTo('back:welcomePage');
        }, function (errorMessage) {
          $scope.errorMessage = errorMessage;
          $scope.navigateTo('back:welcomePage');
        });
    };

    $scope.scanPromo = function () {
      afterScan(phonegapService.scan());
    };

    function afterScan(scanResult) {
      scanResult.then(function (promoCode) {
        afterPromoCheck(backendService.promo(promoCode));
      }, function (scanError) {
        if (!scanError.canceled) {
          $scope.successMessage = '';
          $scope.errorMessage = 'Fehler beim Scan';
        }
      });
    }

    function afterPromoCheck(promoResult) {
      promoResult.then(function (promoSuccess) {
        $scope.successMessage = promoSuccess;
        $scope.errorMessage = '';
      }, function (promoError) {
        $scope.successMessage = '';
        $scope.errorMessage = promoError;
      });
    }
  }

  RentalController.$inject = ['$scope', 'rentalService', 'backendService', 'utilsService', 'phonegapService'];

  return RentalController;
});