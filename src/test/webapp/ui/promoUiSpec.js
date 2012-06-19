describeUi('promo', '/rylc-html5/index.html#/rylc-html5/welcomePage.html', function () {
  beforeLoad(function () {
    mockBackend();
    mockPhonegap();
  });

  it('should open a barcode scanner when the promo button is clicked', function () {
    runs(function () {
      click(".promo");
    });
    runs(function () {
      expect(phonegapService().scan).toHaveBeenCalled();
    });
  });

  it('should do nothing if the scan was aborted', function() {
    runs(function () {
      phonegapServiceResult('scan').reject({cancel: true});
      click(".promo");
    });
    runs(function () {
      expect(backendService().promo).not.toHaveBeenCalled();
      expect(value(".success")).toBe('');
    });
  });

  it('should display a successful promo scan', function() {
    var somePromoCode = 'somePromoCode';
    var somePromoSuccessMessage = 'someSucccessMessage';
    runs(function () {
      backendServiceResult('promo').resolve(somePromoSuccessMessage);
      phonegapServiceResult('scan').resolve(somePromoCode);
      click(".promo");
    });
    runs(function () {
      expect(backendService().promo).toHaveBeenCalledWith(somePromoCode);
      expect(value(".success")).toBe(somePromoSuccessMessage);
    });

  });

  it('should display an error message if the promo code was incorrect', function() {
    var somePromoCode = 'somePromoCode';
    var somePromoErrorsMessage = 'someErrorMessage';
    runs(function () {
      backendServiceResult('promo').reject(somePromoErrorsMessage);
      phonegapServiceResult('scan').resolve(somePromoCode);
      click(".promo");
    });
    runs(function () {
      expect(value(".error")).toBe(somePromoErrorsMessage);
    });

  });
});

