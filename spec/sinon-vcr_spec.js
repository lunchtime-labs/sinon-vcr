var SinonVcr = require('../src/sinon-vcr');
var test = require('vcr/test');

describe('SinonVcr', function() {
  afterEach(function() {
    SinonVcr.reset();
  });

  describe('#server', function () {
    it('allows access to the sinon.fakeServer', function () {
      expect(typeof SinonVcr.server).to.eq('object')
    });
  });

  describe('#use', function () {
    it('responds to the endpoints described in the mock', function(done) {
      SinonVcr.use(test);

      $.get(
        'https://127.0.0.1:8443/system/AD?_action=test',
        function(response) {
          expect(response.name).to.eq('AD');
          expect(response.ok).to.eq(true);
          done();
        }
      );
    });
  });

  describe('#reset', function () {
    it('restores the server/does not respond to endpoints', function(done) {
      SinonVcr.reset();

      $.get('https://127.0.0.1:8443/system/AD?_action=test').fail(function(){
        done()
      });
    });
  });
});
