/* global htmlEditor, jsEditor, cssEditor */
'use strict';

(function() {
  var html = `<button id="button">On/Off</button>`;
  var js = `var led = new five.Led(7);
var button = document.querySelector('#button');

button.addEventListener('click', function() {
  led.toggle();
});
`;
  htmlEditor.setValue(html, -1);
  jsEditor.setValue(js, -1);
  cssEditor.setValue('');
}());
