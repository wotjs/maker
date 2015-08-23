/* global five, ChromeUsbSerialport */
'use strict';

(function() {
  var options = {
  	baudRate: 57600,
  	extensionId: 'ehhlbpaincffplpnncabpfcokanbhiem'
  };
  var port = new ChromeUsbSerialport(null, options, true);
  var board = new five.Board({ port: port, repl: false });

  board.on('ready', function() {
    console.log('Arduino board is ready.');
    parent.postMessage('Arduino board is ready.', '*');
    window.dispatchEvent(new CustomEvent('boardready'));
  });

  console.log('Connecting Arduino board...');
  parent.postMessage('Connecting Arduino board...', '*');
}());
