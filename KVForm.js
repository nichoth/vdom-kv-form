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
        onComplete: onComplete()
      });
    }))
  });

  function onComplete() {
    return function() {
      console.log("bla");
      console.log(s());

      s.rows.push( KVInput({
        onComplete: onComplete()
      }));

      console.log(s());
    };
  }

  return s;
}

KVForm.render = function render(state) {
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
