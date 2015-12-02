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

var loop = require('main-loop')(state(), render, vdom);
state(loop.update);
document.getElementById('content').appendChild(loop.target);

function render(state) {
  return h('form', {
    style: {
      backgroundColor: 'whitesmoke',
      padding: '1em',
      margin: '3em'
    },
    onsubmit: function(ev) {
      ev.preventDefault();
      console.log(Form.values(state));
    }
  }, [
    Form.render(h, state),
    require('../lib/submit-button')(h)
  ]);
}
