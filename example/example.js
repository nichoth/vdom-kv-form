var createElement = require('virtual-dom/create-element');
var h = require('virtual-dom/h');
var Form = require('../KVForm.js');

var state = Form({
  rows: {
    0: {example: 'row'}
  },
  renderRow: render
});

function render() {
  return h('div', ['example row']);
}

var virtualEl = Form.render(state);
var el = createElement(virtualEl);

document.getElementById('content').appendChild(el);
