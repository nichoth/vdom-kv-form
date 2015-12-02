var struct = require('observ-struct');
var value = require('observ');
var oArray = require('observ-array');
var KVInput = require('vdom-form/lib/KVInput');
var Row = require('./lib/row');
var state = require('@nichoth/state');
var noop = function(){};

module.exports = KVForm;


function KVForm(opts) {
  opts = opts || {};
  opts.rows = opts.rows || [{ field: '', value: ''}];

  var rows = opts.rows.map(function(r, i) {
    return Row({
      field: r.field,
      value: r.value,
      onDelete: onDelete.bind(null, i),
      onComplete: onComplete
    });
  });

  var s = state({
    rows: oArray(rows),
    focus: value([]),
  });

  function onDelete(index) {
    if (s.rows().length <= 1) return;
    s.rows.splice(index, 1);
    var lastRow = s.rows.get(s.rows().length - 1);
    KVInput.focusValue(Row.input(lastRow));
  }

  function onComplete(ev) {
    var rs = s.rows();
    if ( !KVInput.isComplete(Row.input(rs[rs.length - 1])) ) { return; }
    ev.preventDefault();
    s.rows.push(Row({
      field: '',
      value: '',
      focus: 'field',
      onDelete: onDelete.bind(null, rs.length),
      onComplete: onComplete
    }));
  }

  return s;
}

KVForm.values = function (data) {
  return data.rows.map(function(r) {
    return KVInput.value(Row.input(r));
  });
};

KVForm.render = function(h, state) {
  return h('div.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
      state.handles.onSubmit(state.rows.map(function(r) {
        return KVInput.value(Row.input(r));
      }));
    }
  }, [
    state.rows.map(function(r) {
      return Row.render(h, r);
    })
  ]);
};
