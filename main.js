var fs = require('fs');
var requestP = require('request-promise');
var request = require('request');
var isStream = require('is-stream');

var rootUrl = 'http://labs.iconfinder.com';

// Upload a file stream
var uploadStream = function(fileStream) {

  return requestP.post({
    url: rootUrl + '/converter/ajax/upload',
    method: 'POST',
    formData: {
      files: fileStream
    }
  });

};

// Upload a file on disk
var uploadFile = function(pathToFile) {

  return uploadStream(fs.createReadStream(pathToFile));

};

// Convert an uploaded file to icon
var convert = function(urlToFile, iconType) {

  return requestP({
    url: rootUrl + '/converter/ajax/convert',
    method: 'POST',
    json: {
      'icon_input_urls': [urlToFile],
      'icon_output_format': iconType || 'icns'
    }
  });

};

// Full URL to converted file
var downloadFile = function(convertResult) {

  return rootUrl + convertResult.icon_output_url;

};

// Converted file as a downladable stream (returns a stream that can you can .pipe())
var downloadStream = function(convertResult) {

  var urlToFile = downloadFile(convertResult);
  return request(urlToFile);

};

// Uploads a file or stream, converts it and downloads result
// If a stream is inputted, the result in the promise is a stream (you can do .pipe(fs.createWriteStream('out.icns')))
// If path to a file is inputted, the result in the promise is a url
var uploadConvertDownload = function(input, iconType) {

  var upload;
  var isUploadStream = isStream(input);

  if(isUploadStream) {
    upload = uploadStream(input);
  } else {
    upload = uploadFile(input);
  }

  return upload
    .then(function(result) {

      var data = JSON.parse(result);
      return convert(data[0].upload_filename, iconType);

    })
    .then(function(result) {

      if (isUploadStream) {
        return downloadStream(result);
      } else {
        return downloadFile(result);
      }

    });

};

module.exports = {
  uploadStream: uploadStream,
  uploadFile: uploadFile,
  convert: convert,
  downloadFile: downloadFile,
  downloadStream: downloadStream,
  uploadConvertDownload: uploadConvertDownload
};