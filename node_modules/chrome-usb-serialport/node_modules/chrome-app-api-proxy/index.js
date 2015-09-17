'use strict';

(function(exports) {
  function ChromeApiProxy(extensionId) {
    this._events = new Map();
    this._port = chrome.runtime.connect(extensionId);
  }

  ChromeApiProxy.prototype = {
    _events: null,
    _port: null,

    call: function(api) {
      // Convert to an Array.
      var params = Array.prototype.slice.call(arguments);
      var port = this._port;
      var callId = this._uuid();
      return new Promise(function(resolve) {
        if (params.length > 1) {
          params.shift();
        } else {
          params = null;
        }
        port.postMessage({
          callId: callId, call: api, params: params
        });
        port.onMessage.addListener(function(message) {
          message.callId === callId && resolve(message.data);
        });
      });
    },

    listenSerialPort: function(callback) {
      callback && this._port.onMessage.addListener(function(message) {
        message.type === 'serial' && callback(message.info);
      });
    },

    _uuid: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
      });
    }
  };

  exports.ChromeApiProxy = ChromeApiProxy;
}(window));
