'use strict';

(function () {

  window.addEventListener('DOMContentLoaded', function (event) {
    // Use getUserMedia for accessing video camera.
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;

    var warningSection = document.querySelector('.warning');

    // Check if browser supports WebRTC.
    if (!navigator.getUserMedia || !window.URL) {
      warningSection.innerHTML = '<p>navigator.getUserMedia is not supported in your browser!</p>';
      return;
    }

    var $video = document.querySelector('video');

    var cameraOptions = {
      video: true,
      audio: false
    };

    // Start getting media from camera.
    navigator.getUserMedia(cameraOptions, function (stream) {
      $video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
    }, function (error) {
      console.log(error);
      warningSection.innerHTML = '<p>ERROR: ' + error.name + '</p>';
    }, false);

    $video.play();
  }, false);

}());
