'use strict';

chrome.runtime.onConnectExternal.addListener(function(port) {
  var state = document.querySelector('#state');
  state.innerHTML = 'Connected';

  // Send serialport data to the Webpage.
  chrome.serial.onReceive.addListener(function(info) {
    info.data = toHexString(info.data);
    port.postMessage({ type: 'serial', info: info });
  });

  port.onMessage.addListener(function(message) {
    var callId = message.callId;
    var params = message.params;
    if (!params) {
      params = [];
    }
    params.push(function(data) {
      port.postMessage({ callId: callId, data: data });
    });
    // Convert Array to ArrayBuffer.
    if (message.call === 'chrome.serial.send') {
      params[1] = new Uint8Array(params[1]).buffer;
    }
    var call = window;
    var objects = message.call.split('.');
    objects.forEach(function(object) {
      call = call[object];
    });
    call instanceof Function && call.apply(null, params);
  });

  function toHexString(arrayBuffer) {
    var string = '';
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < uint8Array.length; i++) {
      var hex = uint8Array[i].toString(16);
      if (hex.length == 1) {
        string += '0';
      }
      string += hex;
    }
    return string;
  }
});
