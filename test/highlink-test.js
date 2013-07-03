var assert = require('assert'),
    fs = require('fs'),
    highlink = require('../highlink/highlink'),
    testUrl = 'http://lists.numenta.org/pipermail/nupic_lists.numenta.org/2013-July/000476.html'
    testHtmlContains = '[nupic-dev] Transcribing CLA white paper into wiki';

describe('highlink', function() {
    it('returns the right title within the body of the specified url', function(done) {
        highlink(testUrl, 'pandoc', function(err, body) {
            assert.ifError(err, 'error returned to callback');
            assert(body.indexOf(testHtmlContains) > -1, 'bad response body');
            done();
        });
    });

});