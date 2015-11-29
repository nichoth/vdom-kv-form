var state = require('@nichoth/state');
var KVInput = require('vdom-form/lib/KVInput');
var delButton = require('vdom-buttons/lib/delete');

module.exports = Row;

function Row (opts) {
  opts = opts || {};
  opts.onDelete = opts.onDelete || function(){};

  var s = state({
    input: KVInput(opts),
    handles: {
      delete: opts.onDelete
    }
  });

  return s;
}

Row.input = function(state) {
  return state.input;
};

Row.render = function(h, state) {
  console.log(arguments);
  return h('div.vdom-kv-form-row', [
    KVInput.render(h, state.input),
    delButton(h, { onClick: function(ev) {
      ev.preventDefault();
      state.handles.delete();
    } })
  ]);
};
