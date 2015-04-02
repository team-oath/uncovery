var chai = require('chai');
var expect = chai.expect;
var db = require('../server/db/config');

describe('database storage', function(){
  it('should open a database connection', function(done) {
    db.initialize(function(err) {
      expect(err).to.equal(null);
      done();
    });
  });

});
