var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var map = require('lodash.map');
var oArray = require('observ-array');
var KVInput = require('vdom-kv-input');
var noop = function(){};

module.exports = KVForm;

function KVForm(opts) {

  var s = state({
    rows: oArray( (opts.rows || []).map(function(r, i) {
      return KVInput({
        field: r.field,
        value: r.value,
        onDelete: onDelete(i),
        onComplete: onComplete()
      });
    }))
  });


  function onDelete(index) {
    return function() {
      s.rows.splice(index, 1);
    };
  }

  function onComplete() {
    return function() {
      s.rows.push( KVInput({
        onComplete: onComplete(),
        onDelete: onDelete(s.rows().length)
      }));
    };
  }

  return s;
}

KVForm.render = function render(state) {
  return h('form.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
    }
  }, map(state.rows, function(r, i) {
      return KVInput.render(r);
    })
  );
};
