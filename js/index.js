/* global CodeMirror */
'use strict';

(function() {
  var DEFAULT_SCRIPT = 'var led = new five.Led(7);\nled.on();\n';
  var editor = document.querySelector('#editor');
  var log = document.querySelector('#log');
  var run = document.querySelector('#run');

  var editorCodeMirror = CodeMirror(editor, {
    lineNumbers: true,
    mode: 'javascript',
    value: DEFAULT_SCRIPT
  });
  editorCodeMirror.setSize('100%', '100%');

  var logCodeMirror = CodeMirror(log, {
    readOnly: true,
  });
  logCodeMirror.setSize('100%', '100%');

  run.addEventListener('click', function() {
    /*jshint evil:true */
    eval(editorCodeMirror.getValue());
  });

  window.addEventListener('boardconnecting', function() {
    var log = logCodeMirror.getValue();
    log = 'Connecting the Arduino board...\n' + log;
    logCodeMirror.setValue(log);
    run.disabled = true;
  });

  window.addEventListener('boardready', function() {
    var log = logCodeMirror.getValue();
    log = 'Arduino board is connected.\n' + log;
    logCodeMirror.setValue(log);
    run.disabled = false;
  });
}());
