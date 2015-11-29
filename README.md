# Image to icon converter

> Convert images (png/jpg/gif) to icons (icns/ico)

This is an unoffical node wrapper for Iconfinder's icon converter utility found here: http://labs.iconfinder.com/converter

## Features

- Takes in any type of images (png/jpg/gif)
- Outputs to most common icon types (icns/ico)
- Returns A+/ES6 style promises
- Supports streams so you can .pipe() files through

## Installation

`npm install iconfinder-converter`

## Usage

Upload file, conver it and get download URL:

```javascript
var converter = require('../main.js');

var file = __dirname + '/image.png';

converter.uploadConvertDownload(file)
  .then(function(result) {
    // result is a URL to the resulting icon file
    console.log(result)
  });
``