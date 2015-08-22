/* global ace */
'use strict';

(function() {
  var log = document.querySelector('#log');
  var run = document.querySelector('#run');
  var editor = ace.edit('editor');

  editor.setTheme("ace/theme/twilight");
  editor.getSession().setMode("ace/mode/javascript");

  run.addEventListener('click', function() {
    /*jshint evil:true */
    eval(editor.getValue());
  });

  window.addEventListener('boardconnecting', function() {
    log.innerHTML = 'Connecting the Arduino board...';
  });

  window.addEventListener('boardready', function() {
    log.innerHTML = 'Arduino board is connected.';
    run.style.display = 'block';
  });
}());
