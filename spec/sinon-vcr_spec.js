var SinonVcr = require('../src/sinon-vcr');

describe('SinonVcr', function() {
  it('exports window.server', function () {
    expect(typeof window.server).to.eq('function')
  });
});
