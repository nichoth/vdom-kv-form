# vdom kv form

Editable list of keys and values, made with `virtual-dom`, compatible with raynos/mercury component interface.


## install

    $ npm install vdom-kv-form


## example

```js
var createElement = require('virtual-dom/create-element');
var h = require('virtual-dom/h');
var Form = require('../KVForm.js');

// returns `observ-struct` instance
var state = Form({
  rows: [
    {
      field: 'my field',
      value: 'my value'
    }
  ]
});

var virtualEl = Form.render( state() );
var el = createElement(virtualEl);

document.getElementById('content').appendChild(el);
```
