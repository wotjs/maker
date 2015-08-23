/* global ace */
'use strict';

(function() {
  var log = document.querySelector('#log');
  var run = document.querySelector('#run');
  var editor = ace.edit('editor');

  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/javascript");

  run.addEventListener('click', function() {
    // Create sandbox.
    var sandbox = document.querySelector('#sandbox');
    if (sandbox) {
      sandbox.parentNode.removeChild(sandbox);
    }
    sandbox = document.createElement('iframe');
    sandbox.style.display = 'node';
    sandbox.id = 'sandbox';
    document.body.appendChild(sandbox);
    sandbox.src = 'sandbox.html';
    // Run code in sandbox.
    sandbox.addEventListener('load', function() {
      var script = document.createElement('script');
      script.text = `
        window.addEventListener('boardready', function() {
          console.log('Arduino board is running.');
          parent.postMessage('Arduino board is running.', '*');
          ${editor.getValue()}
        });
      `
      sandbox.contentWindow.document.head.appendChild(script);
    });
  });

  window.addEventListener('message', function(evt) {
    log.innerHTML = evt.data;
  });
}());
