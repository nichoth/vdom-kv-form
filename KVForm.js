var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var map = require('lodash.map');
var noop = function(){};

module.exports = KVForm;

function KVForm(opts) {
  var s = state({
    rows: opts.rows || {}
  });
  s.renderRow = opts.renderRow || noop;
  return s;
}

KVForm.render = function(state) {
  return h('form.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
    }
  }, [
    map(state.rows, function(r, i) {
      return state.renderRow(r);
    })
  ]);
};
