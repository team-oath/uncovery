var expect = require('chai').expect;
var util = require('../server/core/utilities');

describe('Utilities', function() {
  it('should get the amount of time that has elapsed', function() {
    var past = Date.now()-60000;
    var elapsed = util.getTimeElapsedSince(past);
    expect(elapsed).to.equal('a minute ago');
  });
});
