var assert = require('assert')
var flatten = require('../')

describe('#flatten()', function () {
  var obj = {
    f: [
      1,
      2,
      {
        foo: {
          bar: 'foo',
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

  var params = {
    'f[0]': 1,
    'f[1]': 2,
    'f[2].foo.bar': 'foo',
    'f[2].foo.list[0]': 1,
    'f[2].foo.list[1]': 2,
    'f[2].foo.list[2]': 3,
    'f[3].ok': true,
    'f[3].hello': {},
    'f[3].word': []
  }

  it('object flatten with string value should be ok.', function () {
    var tuple = flatten.flatten(obj)
    assert.equal(tuple['f[2].foo.bar'], obj.f[2].foo.bar)
  })

  it('object flatten with boolean value should be ok.', function () {
    var tuple = flatten.flatten(obj)
    assert.ok(tuple['f[3].ok'])
  })

  it('un-flatten result should be ok.', function () {
    var ret = flatten.unflatten(params)
    assert.equal(params['f[2].foo.bar'], ret.f[2].foo.bar)
    assert.ok(ret.f[3].ok)
  })

  it('un-flatten result with a empty object.', function () {
    var ret = flatten.unflatten(params)
    assert.deepEqual({}, ret.f[3].hello)
    assert.deepEqual([], ret.f[3].word)
  })
})
