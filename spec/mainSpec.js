var fs = require('fs');
var isStream = require('is-stream');

var converter = require('../main.js');
var testFile = __dirname + '/testFile.png';

describe('Library', function() {

  it('should be able to upload a file, convert it and get a url', function(done) {

    converter.uploadConvertDownload(testFile)
      .then(function(result) {

        expect(typeof result).toBe('string');
        expect(isStream(result)).toBe(false);
        expect(result).toMatch('http://labs.iconfinder.com');
        done();

      });

  });

  it('should be able to upload a stream, convert it and get a stream', function(done) {

    var testStream = fs.createReadStream(testFile);

    converter.uploadConvertDownload(testStream)
      .then(function(result) {

        // The result is a stream, so we could e.g.
        // result.pipe(fs.createWriteStream('out.icns'));

        expect(isStream(result)).toBe(true);
        done();

      });

  });

});
