'use strict';

var APP_WIDTH = 350;
var APP_HEIGHT = 100;

chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('index.html', {
    outerBounds: {
      left: screen.width - APP_WIDTH,
      top: screen.height - APP_HEIGHT,
      maxWidth: APP_WIDTH,
      maxHeight: APP_HEIGHT,
      minWidth: APP_WIDTH,
      minHeight: APP_HEIGHT
    },
    alwaysOnTop: true
  });
});
