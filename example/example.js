var createElement = require('virtual-dom/create-element');
var h = require('virtual-dom/h');
var Form = require('../KVForm.js');

var state = Form({
  rows: [
    {
      field: 'my field',
      value: 'my value'
    }
  ]
});

var virtualEl = Form.render( state() );
var el = createElement(virtualEl);

document.getElementById('content').appendChild(el);
