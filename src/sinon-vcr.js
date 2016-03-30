
(function () {
  var SinonVcr = (function () {
    // Constructor
    function SinonVcr(){
      this.init();
    }

    // Public
    SinonVcr.prototype.reset = function(capture) {
      this.server.restore();
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
    SinonVcr.prototype.init = function (capture) {
      if (capture === 'capture') {
        this.server = {
          respondWith: function (){},
          restore: function (){ debugger }
        }
      } else {
        this.server = sinon.fakeServer.create();
        this.server.respondImmediately = true;
      }
    }

    return SinonVcr;
  })();

  module.exports = new SinonVcr();
})()
