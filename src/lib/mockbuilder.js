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
    };

    Mockbuilder.prototype.respondWith = function (){};

    Mockbuilder.prototype.restore = function (){
      // Todo: make this downloadable by Base64 encoding
      console.log("Outputting cassette: ");

      console.log(JSON.stringify(this._format(cassette), null, '  '));

      cassette = [];
    };

    Mockbuilder.prototype._format = function () {
      return cassette.map(function(mock) {
        // response
        mock.response = JSON.parse(mock.response);

        // headers
        var headers = [];
        var headerArr = mock.headers.split("\r\n");
        var index = 0;

        headerArr.forEach(function (singleHeader) {
          if (index < headerArr.length-1) {
            var result = {};

            var headerObj = singleHeader.split(':');

            result[headerObj[0]] = headerObj[1];

            headers.push(result);
          }

          index++;
        });

        mock.headers = headers;

        // Return
        return mock;
      });
    }

    return Mockbuilder;
  })();

  module.exports = Mockbuilder;
})();
