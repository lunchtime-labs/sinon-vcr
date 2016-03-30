var VCR = require('../src/sinon-vcr');
var test = require('vcr/test');
var test_2 = require('vcr/test_2');

describe('VCR', function() {
  describe('playback', function() {
    beforeEach(function() {
      VCR.init();
    });

    afterEach(function() {
      VCR.reset();
    });

    describe('#server', function () {
      it('allows access to the sinon.fakeServer', function () {
        expect(typeof VCR.server).to.eq('object')
      });
    });

    describe('#use', function () {
      it('responds to the endpoints described in the mock', function(done) {
        VCR.use(test);

        $.get(
          'https://127.0.0.1:8443/system/AD?_action=test',
          function(response) {
            expect(response.name).to.eq('AD');
            expect(response.ok).to.eq(true);
            done();
          }
        );
      });

      it('allows you to use multiple cartridges, cascading', function(done) {
        VCR.use(test);
        VCR.use(test_2);

        $.get(
          'https://127.0.0.1:8443/config/ui/configuration',
          function(response) {
            expect(response.key).to.eq('value');
            done();
          }
        );
      });
    });

    describe('#reset', function () {
      it('restores the server/does not respond to endpoints', function(done) {
        VCR.reset();

        $.get('https://127.0.0.1:8443/system/AD?_action=test').fail(function(){
          done()
        });
      });
    });
  });

  describe('capture', function () {
    describe('#init("capture")', function (){
      beforeEach(function() {
        VCR.init('capture');
      });

      afterEach(function() {
        VCR.reset();
      });

      it('allows a call to a url that is not mocked', function(done) {
        $.get('https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo').success(function(){
          done();
        });
      });
    });
  });
});
