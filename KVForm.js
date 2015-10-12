var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var map = require('lodash.map');
var oArray = require('observ-array');
var value = require('observ');
var KVInput = require('vdom-kv-input');
var noop = function(){};

module.exports = KVForm;

function KVForm(opts) {

  var rows = oArray( (opts.rows || []).map(function(r, i) {
    return KVInput({
      field: r.field,
      value: r.value,
      onDelete: onDelete(i),
      onComplete: onComplete()
    });
  }));

  var s = state({
    rows: rows,
    lastRowIsEmpty: value( KVForm.lastRowIsEmpty({rows: rows}) )
  });


  function onDelete(index) {
    return function() {
      s.rows.splice(index, 1);
      s.lastRowIsEmpty.set(KVForm.lastRowIsEmpty(s));
    };
  }

  function onComplete() {
    return function() {

      if (!s.lastRowIsEmpty()) {
        addRow(s, {
          onComplete: onComplete(),
          onDelete: onDelete(s.rows().length)
        });

        s.lastRowIsEmpty.set(KVForm.lastRowIsEmpty(s));
      }

    };
  }

  return s;
}


function addRow(state, data) {
  state.rows.push( KVInput({
    onComplete: data.onComplete,
    onDelete: data.onDelete
  }));
}


KVForm.lastRowIsEmpty = function(state) {
  var rs = state.rows();
  return rs.length && !( KVInput.isComplete(state.rows.get(rs.length-1)) );
};


KVForm.render = function render(state) {
  console.log(state);
  return h('form.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
    }
  }, map(state.rows, function(r, i) {
      return KVInput.render(r);
    })
  );
};
