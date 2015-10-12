var h = require('virtual-dom/h');
var state = require('@nichoth/state');
var map = require('lodash.map');
var oArray = require('observ-array');
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
  });


  function onDelete(index) {
    return function() {
      s.rows.splice(index, 1);
    };
  }

  function onComplete() {
    return function(ev) {

      if ( lastRowIsEmpty( s.rows ) ) {
        ev.preventDefault();
        addRow(s, {
          onComplete: onComplete(),
          onDelete: onDelete(s.rows().length)
        });
      }
    };
  }

  return s;
}


function addRow(state, data) {
  state.rows.push( KVInput({
    onComplete: data.onComplete,
    onDelete: data.onDelete,
    focus: 'field'
  }));
}

function lastRowIsEmpty(rows) {
  var rs = rows();
  return KVInput.isComplete( rows.get(rs.length-1) );
}


KVForm.render = function render(state) {
  return h('div.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
    }
  }, map(state.rows, function(r, i) {
      return KVInput.render(r);
    })
  );
};
