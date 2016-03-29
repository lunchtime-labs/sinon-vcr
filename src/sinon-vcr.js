(function () {
  var SinonVcr = (function () {
    SinonVcr.use = function (moduleName) {

    };

    function SinonVcr(){}

    return SinonVcr;
  })();

  window.server = sinon.fakeServer.create();

  server.respondImmediately = true;

  module.exports = SinonVcr;
})()
