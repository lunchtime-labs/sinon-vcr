
(function () {
  var SinonVcr = (function () {
    // Constructor
    function SinonVcr(){
      this._init();
    }

    // Public
    SinonVcr.prototype.reset = function() {
      this.server.restore();

      this._init();
    };

    SinonVcr.prototype.use = function (mock) {
      var _this = this;

      mock.forEach(function(mock){
        _this.server.respondWith(
          mock.url,
          [
            mock.status,
            mock.headers,
            mock.response
          ]
        )
      });
    };

    // Private
    SinonVcr.prototype._init = function () {
      this.server = sinon.fakeServer.create();
      this.server.respondImmediately = true;
    }

    return SinonVcr;
  })();

  module.exports = new SinonVcr();
})()
