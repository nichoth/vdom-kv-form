# vdom kv form

[demo](https://e3150f0cbd2c8afe585f573074aeddd827bd99ac.htmlb.in)

List of keys and values, easily editable with keyboard navigation. It's made with `virtual-dom` and compatible with mercury component interface.


## install

    $ npm install vdom-kv-form


## example

```js
var vdom = require('virtual-dom');
var h = vdom.h;
var Form = require('vdom-kv-form');

var state = Form({
  rows: [
    {
      field: 'my field',
      value: 'my value'
    }
  ]
});

var loop = require('main-loop')( state(), Form.render, vdom );
state(loop.update);
document.getElementById('content').appendChild(loop.target);
```
