## object.flatten

Object flatten/un-flatten utilities.

## Installation

```sh
npm i object.flatten
```

## Example

```js
const { flatten, unflatten } = require('object-flatten')
const assert = require('assert')

const obj = {
  f: [
    1,
    2,
    {
      foo: {
        bar: "foo",
        list: [ 1, 2, 3 ]
      }
    },
    {
      ok: true,
      hello: {},
      word: []
    }
  ]
}

// convert nested json to a k/v params
const params = flatten(obj)
console.log(params)

/*
  {
    "f[0]": 1,
    "f[1]": 2,
    "f[2].foo.bar": "foo",
    "f[2].foo.list[0]": 1,
    "f[2].foo.list[1]": 2,
    "f[2].foo.list[2]": 3,
    "f[3].ok": true,
    "f[3].hello": {},
    "f[3].word": []
  }
*/

// un-flatten params to json
const data = unflatten(params)
assert.deepEqual(obj, data) // true

```
