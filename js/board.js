/* global five, ChromeUsbSerialport */
'use strict';

(function() {
  var options = {
  	baudRate: 57600,
  	extensionId: 'mncdajaedfblonbkmodofckdialkolgk'
  };
  var port = new ChromeUsbSerialport(null, options, true);
  var board = new five.Board({ port: port, repl: false });

  board.on('ready', function() {
    window.dispatchEvent(new CustomEvent('boardready'));
  });

  window.dispatchEvent(new CustomEvent('boardconnecting'));
}());
