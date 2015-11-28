// var h = require('virtual-dom/h');
var struct = require('observ-struct');
var value = require('observ');
var map = require('lodash.map');
var oArray = require('observ-array');
var KVInput = require('vdom-form/lib/KVInput');
var Form = require('vdom-form');
var curry = require('vdom-form/lib/curry-component');
var delButton = require('vdom-buttons/lib/delete');
var noop = function(){};

module.exports = KVForm;


function KVForm(opts) {
  opts = opts || {};
  opts.rows = opts.rows || [{ field: '', value: '' }];
  opts.onSubmit = opts.onSubmit || noop;

  var rows = oArray(opts.rows.map(function(r, i) {
    var c = KVInput({
      field: r.field,
      value: r.value,
      onDelete: onDelete.bind(null, i),
      onComplete: onComplete
    });

    return struct({
      input: c,
      button: value(function(h) {
        return delButton(h, {onClick: onDelete.bind(null, i)});
      })
    });
  }));

  var state = struct({
    rows: rows,
    onSubmit: opts.onSubmit
  });

  function onDelete(index) {
    rows.splice(index, 1);
  }

  function onComplete(ev) {
    if ( lastRowIsEmpty(state.rows()) ) { return; }
    ev.preventDefault();
    rows.push(struct({
      input: KVInput({
        field: '',
        value: '',
        focus: 'field',
        onComplete: onComplete,
        onDelete: onDelete.bind(null, rows().length)
      }),
      button: value(function(h) {
        return delButton(h, {onClick: onDelete.bind(null, rows().length)});
      })
    }));
  }

  return state;
}


function lastRowIsEmpty(rows) {
  console.log(rows);
  var v = !KVInput.hasValue(rows[rows.length - 1].input);
  console.log(v);
  return v;
}


KVForm.render = function render(h, state) {
  console.log(arguments);
  return h('form.vdom-kv-form', {
    onsubmit: function(ev) {
      ev.preventDefault();
      state.onSubmit(Form.values(state.form));
    }
  },
  state.rows.map(function(r) {
    return h('div', [
      KVInput.render(h, r.input),
      r.button(h)
    ]);
  }));
};
