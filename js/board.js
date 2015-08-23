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
    window.dispatchEvent(new CustomEvent('boardready'));
    console.log('Arduino board is ready.');
    parent.postMessage('Arduino board is ready.', '*');
  });

  console.log('Connecting Arduino board...');
  parent.postMessage('Connecting Arduino board...', '*');
}());
