describe('phonegapService', function () {
  var phonegapService, oldCordova, cordova;

  beforeEach(function () {
    module("rylc");
    var oldCordova = window.cordova;
    cordova = window.cordova = {
      exec:jasmine.createSpy('exec')
    };
    inject(function ($injector) {
      phonegapService = $injector.get("phonegapService");
    });
  });

  afterEach(function () {
    window.cordova = oldCordova;
  });

  it("should call cordova.exec with the right parameters", function () {
    phonegapService.scan();
    expect(cordova.exec).toHaveBeenCalled();
    var args = cordova.exec.mostRecentCall.args;
    expect(args[2]).toBe('BarcodePlugin');
    expect(args[3]).toBe('scan');
  });

  it("should return a promise that resolves with the cordova.exec success callback", function () {
    var someCode = 'someCode';
    var promise = phonegapService.scan();
    var callback = jasmine.createSpy('success');
    promise.then(callback);
    cordova.exec.mostRecentCall.args[0](someCode);
    expect(callback).toHaveBeenCalledWith(someCode);
  });

  it("should return a promise that rejects with the cordova.exec fail callback", function () {
    var someError = 'someError';
    var promise = phonegapService.scan();
    var callback = jasmine.createSpy('success');
    promise.then(null, callback);
    cordova.exec.mostRecentCall.args[1](someError);
    expect(callback).toHaveBeenCalledWith(someError);
  });
});
