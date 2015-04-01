# ASCII to Video

The main idea of this this project is to take advantage of the
[`navigator.getUserMedia`](http://www.w3.org/TR/mediacapture-streams/)
provided by [WebRTC](http://www.w3.org/TR/webrtc/) to convert a stream
from the video camera to an ASCII representation.

You just have to place yourself in front of your computer's camera
and see the result being displayed on an ASCII representation.

The character set that I chose is `#@%OHLTI)i=+;:,. `. But you can
try changing these constants in the code to output different
effects.

## Output example

![Output
Example](https://github.com/merodriguezblanco/ascii-video/blob/master/captures/capture.gif)

## How to run

Just start any local server. If you are running linux and have python
installed, try: `python -m SimpleHTTPServer`
