var extend = require('xtend');

module.exports = function(h, attrs) {
  var a = extend({type: 'submit'}, attrs);
  return h('div.vdom-kv-form-button-row', {
    style: {
      textAlign: 'right'
    }
  }, [
    h('button.vdom-kv-form-button', a, ['Save'])
  ]);
};
