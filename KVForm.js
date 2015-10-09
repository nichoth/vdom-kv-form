var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var struct = require('observ-struct');
var map = require('lodash.map');
var oArray = require('observ-array');
var KVInput = require('vdom-kv-input');
var noop = function(){};

module.exports = KVForm;

function KVForm(opts) {
  var s = state({
    rows: oArray( (opts.rows || []).map(function(r, i) {
      return KVInput(r);
    }))
  });

  return s;
}

KVForm.render = function(state) {
  return h('form.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
    }
  }, [
    map(state.rows, function(r, i) {
      return KVInput.render(r);
    })
  ]);
};
