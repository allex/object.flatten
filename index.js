/**
 * Fastest way to flatten / un-flatten nested JSON objects
 *
 * MIT Licensed
 *
 * Authors:
 *   Allex Wang <allex.wxn@gmail.com> (http://iallex.com/)
 */

'use strict'

// refs: <https://stackoverflow.com/questions/19098797/fastest-way-to-flatten-un-flatten-nested-json-objects>

function _flatten (obj, path, target) {
  var i, empty
  if (Object(obj) !== obj) {
    target[path] = obj
  } else if (Array.isArray(obj)) {
    i = obj.length
    if (i > 0) {
      var j = 0
      do {
        _flatten(obj[j], path + '[' + j + ']', target)
      } while (++j < i)
    } else {
      target[path] = []
    }
  } else {
    empty = true
    for (i in obj) {
      empty = false
      _flatten(obj[i], path ? path + '.' + i : i, target)
    }
    if (empty && path) {
      target[path] = {}
    }
  }
}

/**
 * Recursively flattens a JSON object
 */
var flatten = function (data) {
  var result = {}
  _flatten(data, null, result)
  return result
}

var unflatten = function (data) {
  if (Object(data) !== data || Array.isArray(data)) {
    return data
  }
  var regex = /\.?([^.[\]]+)|\[(\d+)\]/g, resultholder = {}
  for (var p in data) {
    var cur = resultholder, m, prop = ''
    while ((m = regex.exec(p))) {
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}))
      prop = m[2] || m[1]
    }
    cur[prop] = data[p]
  }
  return resultholder[''] || resultholder
}

module.exports = {
  flatten,
  unflatten
}
