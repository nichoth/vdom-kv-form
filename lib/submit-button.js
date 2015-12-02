module.exports = function(h) {
  return h('div.vdom-kv-form-button-row', {
    style: {
      textAlign: 'right'
    }
  }, [
    h('button.vdom-kv-form-button', {
      type: 'submit',
    }, ['Save'])
  ]);
};
