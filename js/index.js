/* global five, ChromeUsbSerialport */
'use strict';

(function() {
  var path = '/dev/cu.usbmodem1421';
  var options = { baudRate: 57600 };
  var port = new ChromeUsbSerialport(path, options, true);
  var board = new five.Board({ port: port, repl: false });
  // FIXME: Cannot connect the board.
  board.on('ready', function() {
    var led = new five.Led(7);
    led.blink(300);
  });
}());
