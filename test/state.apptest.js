const chai = require('chai');
const expect = chai.expect;
const jsonDiff = require('./jsondiff');
const totalObjectKeys = require('./totalObjectKeys');

const expectedJSON = require('./state.json');
const actualJSON = require('../output/state.json');

describe('Test Application as Blackbox', function() {
  it('Test JSON is well formed', function(done) {
    done();
  });
  it('JSON has expected Number of Objects', function(done) {
    let objMatrix = totalObjectKeys.traverse(actualJSON);
    expect(objMatrix.totalNoObjects).to.not.equal(0);
    expect(objMatrix.totalNoKeys).to.not.equal(0);
    done();
  });

  it('Test JSON is as expected', function(done) {
    let compareResult = jsonDiff.compareJSONObjects(expectedJSON, actualJSON);
    expect(compareResult.diffs).equal(0);
    done();
  });
});
