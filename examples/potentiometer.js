/* global htmlEditor, jsEditor, cssEditor */
'use strict';

(function() {
  var js = `var pot = five.Sensor({
  pin: 'A0',
  freq: 250
});

pot.on('data', function() {
  document.body.style.backgroundColor = rgb(pot.value);
});

function rgb(value) {
  value = Math.round(value / 4);
  return 'rgb(' + value + ', ' + value + ', ' + value + ')'; 
}
`;
  htmlEditor.setValue('');
  jsEditor.setValue(js, -1);
  cssEditor.setValue('');
}());
