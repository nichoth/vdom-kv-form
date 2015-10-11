var vdom = require('virtual-dom');
var h = vdom.h;
var Form = require('../KVForm.js');

var state = Form({
  rows: [
    {
      field: 'my field',
      value: 'my value'
    }
  ]
});

var loop = require('main-loop')( state(), Form.render, vdom );
state(loop.update);
document.getElementById('content').appendChild(loop.target);
