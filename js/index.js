/* global CodeMirror */
'use strict';

(function(exports) {
  var editor = document.querySelector('#editor');
  var run = document.querySelector('#run');
  var javascript =
`var led = new five.Led(7);
led.on();
`;
  var codeMirror = CodeMirror(editor, {
    lineNumbers: true,
    mode: 'javascript',
    value: javascript
  });
  codeMirror.setSize('100%', '100%');

  run.addEventListener('click', function() {
    /*jshint evil:true */
    eval(codeMirror.getValue());
  });

  window.addEventListener('boardready', function() {
    run.disabled = false;
  });

  // For trying CodeMirror.
  exports.codeMirror = codeMirror;
}(window));
