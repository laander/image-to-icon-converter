# Image to icon converter

> Convert images (png/jpg/gif) to icons (icns/ico)

This is a simple, unoffical node wrapper for Iconfinder's icon converter utility found here: http://labs.iconfinder.com/converter

**Why?**  
Converting image files to the .icns format is surprisingly difficult to do programmatically on anything else than OSX (using Xcode). You got 'iconutil', 'sips' and 'libicns', but they are OSX only which leaves you in the dust when you want it to work on a linux webserver. Last resort are the myriad of online converters stuck in the 90s (and none of them have an API).

**How?**  
Upload an image file through Iconfinder's API, they do their magic and you get an icon file back. Simple.

## Features

- Takes in any type of images (png/jpg/gif)
- Outputs to most common icon types (icns/ico)
- Returns A+/ES6 style promises
- Supports streams so you can .pipe() files through

## Installation

`npm install image-to-icon-converter`

## Usage

Upload file from disk, convert it and get download URL:

```javascript
var converter = require('image-to-icon-converter');
var file = __dirname + '/image.png';

converter.uploadConvertDownload(file, 'icns')
  .then(function(result) {
    // result is a URL to the resulting icon file
    console.log(result)
  });
```

If you supply it with a stream, it will return a stream too:

```javascript
var converter = require('image-to-icon-converter');
var fs = require('fs');
var stream = fs.createReadStream(__dirname + '/image.png');

converter.uploadConvertDownload(stream, 'icns')
  .then(function(result) {
    // result is a stream of the icns file
    result.pipe(fs.createWriteStream('icon.icns'));
  });
```

You can also call each of methods individually (returns promises):

```javascript
var converter = require('image-to-icon-converter');

converter.uploadStream(fileStream);
converter.uploadFile(pathToFile);
converter.convert(urlToFile, iconType);
converter.downloadFile(convertResult);
converter.downloadStream(convertResult);
```