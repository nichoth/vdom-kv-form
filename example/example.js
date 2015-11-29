var vdom = require('virtual-dom');
var h = vdom.h;
var Form = require('../KVForm.js');

var state = Form({
  rows: [
    {
      field: 'my field',
      value: 'my value'
    }
  ],
  onSubmit: console.log.bind(console)
});

var loop = require('main-loop')(state(), render, vdom);
state(loop.update);
console.log(loop.target);
document.getElementById('content').appendChild(loop.target);

function render(state) {
  console.log(arguments);
  return Form.render(h, state);
}
