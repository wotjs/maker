/* global Buffer, ChromeApiProxy, EventEmitter2 */
'use strict';

(function(exports) {
  function ChromeUsbSerialport(path, options, openImmediately, callback) {
    this.path = path;
    this.options = options;
    this._chrome = new ChromeApiProxy(options.extensionId);
    openImmediately && this.open(callback);
  }

  ChromeUsbSerialport.prototype = Object.create(EventEmitter2.prototype);

  ChromeUsbSerialport.prototype._chrome = null;

  ChromeUsbSerialport.prototype._connectionId = -1;

  ChromeUsbSerialport.prototype._isOpened = false;

  ChromeUsbSerialport.prototype.open = function(callback) {
    var that = this;
    var chrome = this._chrome;
    var promise;
    if (this.path) {
      promise = new Promise.resolve(this.path);
    } else {
      promise = chrome.call('chrome.serial.getDevices')
      .then(function(devices) {
        var path;
        // Search devices array
        // and return the last found arduino device.
        // TODO: Support multiple devices.
        devices.forEach(function(device) {
          if (device.path.match('cu.usbmodem')) {
            path = device.path;
          }
        });
        return Promise.resolve(path);
      });
    }
    promise.then(function(path) {
      var options = {
        bitrate: that.options.baudRate
      };
      return chrome.call('chrome.serial.connect', path, options);
    })
    .then(function(info) {
      that._connectionId = info.connectionId;
      chrome.listenSerialPort(that._onData.bind(that));
      // XXX: Workaround to wait for arduino board is ready.
      setTimeout(function() {
        if(!that._isOpened) {
          that._isOpened = true;
          that.emit('open');
        }
      }, 2000);
    });
  };

  ChromeUsbSerialport.prototype._onData = function(info) {
    if (!this._isOpened && info.connectionId === this._connectionId) {
      this._isOpened = true;
      this.emit('open');
    }
    var data = new Uint8Array(this._parseHexString(info.data));
    this.emit('data', data);
  };

  ChromeUsbSerialport.prototype._parseHexString = function(string) {
    var arrayBuffer = new ArrayBuffer(Math.ceil(string.length / 2));
    var uint8Array = new Uint8Array(arrayBuffer);
    for (var i = 0; i < string.length; i += 2) {
      uint8Array[i / 2] = parseInt(string.substr(i, 2), 16);
    }
    return arrayBuffer;
  };

  ChromeUsbSerialport.prototype.write = function(data, callback) {
    var string = JSON.stringify(data);
    data = JSON.parse(string).data;
    this._chrome.call(
      'chrome.serial.send',
      this._connectionId,
      data // The data type is Array.
    );
    callback && callback();
  };

  ChromeUsbSerialport.prototype.close = function(callback) {
    this._chrome.call(
      'chrome.serial.disconnect',
      this._connectionId
    );
    this._isOpened = false;
    this._connectionId = -1;
    callback && callback();
    this.emit('close');
  };

  ChromeUsbSerialport.prototype.flush = function(callback) {
    this._chrome.call(
      'chrome.serial.flush',
      this._connectionId
    );
    callback && callback();
  };

  ChromeUsbSerialport.prototype.drain = function(callback) {
    callback && callback();
  };

  exports.ChromeUsbSerialport = ChromeUsbSerialport;
}(window));
