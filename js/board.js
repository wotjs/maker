/* global five, ChromeUsbSerialport */
'use strict';

(function(exports) {
  var path = '/dev/cu.usbmodem1421';
  var options = { baudRate: 57600 };
  var port = new ChromeUsbSerialport(path, options, true);
  var board = new five.Board({ port: port, repl: false });

  board.on('ready', function() {
    window.dispatchEvent(new CustomEvent('boardready'));
  });

  window.dispatchEvent(new CustomEvent('boardconnecting'));

  exports.arduino = board;
}(window));
