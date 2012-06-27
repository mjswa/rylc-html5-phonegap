describeUi('promo', '/rylc-html5/index.html#welcomePage', function () {
  beforeLoad(function () {
    mockPhonegap();
    mockBackend();
  });

  it("should scan using the phonegapService", function () {
    click(".promo");
    expect(phonegapService().scan).toHaveBeenCalled();
  });

  it("should show an error message if the scan was aborted", function () {
    click(".promo");
    expect(phonegapService().scan).toHaveBeenCalled();
    phonegapServiceResult("scan").reject();
    expect(value(".error")).toEqual("Fehler beim Scan");
  });

  it("should call backendService.promo with the scanned code", function () {
    var someCode = "code1234";
    click(".promo");
    phonegapServiceResult("scan").resolve(someCode);
    expect(backendService().promo).toHaveBeenCalledWith(someCode);
  });

  it("should show the result of the backend service for a valid promo code", function () {
    var someMessage = "someMessage";
    click(".promo");
    phonegapServiceResult("scan").resolve();
    backendServiceResult("promo").resolve(someMessage);
    expect(value(".success")).toEqual(someMessage);
  });

  it("should show the result of the backend service for an erroneous promo code", function () {
    var someError = "someError";
    click(".promo");
    phonegapServiceResult("scan").resolve();
    backendServiceResult("promo").reject(someError);
    expect(value(".error")).toEqual(someError);
  });
});
