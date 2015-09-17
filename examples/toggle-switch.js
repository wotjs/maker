/* global htmlEditor, jsEditor, cssEditor */
'use strict';

(function() {
  var html = `<div id="restroom">Restroom</div>
`;
  var js = `var toggleSwitch = arduino.Switch(6);
var restroom = document.querySelector('#restroom');

Notification.requestPermission();

toggleSwitch.on('open', function() {
  restroom.style.backgroundColor = 'green';
  new Notification('You can go to restroom now!');
});

toggleSwitch.on('close', function() {
  restroom.style.backgroundColor = 'red';
});
`;
  var css = `#restroom {
  color: white;
  font-size: 2rem;
  padding: 1rem;
  width: 9.5rem;
  height: 3rem;
  border-radius: 1rem;
  background-color: green;
}
`;
  htmlEditor.setValue(html, -1);
  jsEditor.setValue(js, -1);
  cssEditor.setValue(css, -1);
}());
