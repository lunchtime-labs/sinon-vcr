var cassette = [];

(function () {
  var Mockbuilder = (function () {
    // Constructor
    function Mockbuilder(){
      var open = XMLHttpRequest.prototype.open;

      XMLHttpRequest.prototype.open = function (method, url) {
        var mockObject = {};
        mockObject.method = method;
        mockObject.url = url;

        this.onload = function() {
          mockObject.status = this.status;
          mockObject.headers = this.getAllResponseHeaders();
          mockObject.response = this.responseText;
        };

        cassette.push(mockObject);

        open.apply(this, arguments);
      };
    }

    Mockbuilder.prototype.respondWith = function (){
    }

    Mockbuilder.prototype.restore = function (){
      console.log(cassette); // Todo: make this downloadable by Base64 encoding
      cassette = [];
    }

    return Mockbuilder;
  })();

  module.exports = Mockbuilder;
})();
