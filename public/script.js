'use strict';

(function () {

  window.addEventListener('DOMContentLoaded', function (event) {
    // Use getUserMedia for accessing video camera.
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var $warningSection = document.querySelector('.warning');

    var displayWarning = function (message) {
      $warningSection.innerHTML = '<p>' + message + '</p>';
    }

    // Check if browser supports WebRTC.
    if (!navigator.getUserMedia || !window.URL) {
      displayWarning('navigator.getUserMedia is not supported in your browser!');
      return;
    }

    var $video = document.querySelector('video'),
        $canvas = document.createElement('canvas'),
        $asciiVideo = document.querySelector('.ascii-video pre'),
        CANVAS_WIDTH = 400,
        CANVAS_HEIGHT = 300;

    var ImageToASCIIConverter = (function (canvas) {
      var context = canvas.getContext('2d'),
          ASCII_CHARS = '@#8&OLI)i=+;:,. '.split(''),
          ASCII_CHARS_LENGTH = ASCII_CHARS.length - 1;

      var convertToASCII = function () {
        // The canvas image data will behave as the Bitmap for the screenshot.
        var imageData = context.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data,
            asciiImage = '',
            pixelMatchingChar,
            x, y, offset, red, blue, green, pixel;

        // Loop through each pixel of the screenshot.
        for (y = 0; y < CANVAS_HEIGHT; y += 1) {
          for (x = 0; x < CANVAS_WIDTH; x += 1) {
            offset = (y * CANVAS_WIDTH + x) * 4;

            // Get grayscale color from screenshot.
            // The easiest way is to get the biggest of the RGB values
            // of each pixel and divide by 255.
            red = imageData[offset];
            green = imageData[offset + 1];
            blue = imageData[offset + 2];
            pixel = Math.max(red, green, blue) / 255;

            // Select ASCII character that corresponds to pixel.
            pixelMatchingChar = ASCII_CHARS[parseInt(pixel * ASCII_CHARS_LENGTH, 10)];

            // Append grayscale character to image result.
            asciiImage += pixelMatchingChar;
          }

          asciiImage += '\n';
        }

        return asciiImage;
      }

      return {
        asciiImage: convertToASCII,
      }
    }($canvas));

    var convertImageFromVideo = function () {
      var context = $canvas.getContext('2d');

      try {
        context.drawImage($video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        $asciiVideo.innerHTML = ImageToASCIIConverter.asciiImage();
      } catch(exception) {
        console.log(exception);
        displayWarning(exception.toString());
      }
    }

    var startDrawingASCIIVideo = function () {
      var context = $canvas.getContext('2d'),
          fps = 30;

      $canvas.setAttribute('width', CANVAS_WIDTH);
      $canvas.setAttribute('height', CANVAS_HEIGHT);
      $video.play();

      setInterval(convertImageFromVideo, Math.round(1000 / fps));
    }

    var cameraOptions = {
      video: true,
      audio: false
    };

    // Start getting media stream from camera.
    navigator.getUserMedia(cameraOptions, function (stream) {
      $video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
      startDrawingASCIIVideo();
    }, function (error) {
      console.log(error);
      displayWarning(error.name);
    }, false);

    $video.play();
  }, false);

}());
