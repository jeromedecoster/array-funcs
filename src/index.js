const fn = require('../flatten')
const test = require('tape')

function qsa(selector) {
  return document.querySelectorAll(selector)
}

test('flatten', function (t) {

  var p = qsa('p')

  t.deepEqual(fn([1, [2, 3]]),      [1, 2, 3])
  t.deepEqual(fn([[1], [2]], 3),    [1, 2, 3])
  t.deepEqual(fn([1], [2], 3),      [1, 2, 3])

  t.deepEqual(fn([p[0], [p, 3]]),   [p[0], p[0], p[1], p[2], 3])
  t.deepEqual(fn([[p[0]], [p]], 3), [p[0], p[0], p[1], p[2], 3])
  t.deepEqual(fn([p[0]],  [p],  3), [p[0], p[0], p[1], p[2], 3])

  var noop = function() {}
  var d = new Date
  t.deepEqual(fn([1, ['abc', 3, [p]]]),     [1, 'abc', 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [{a:1}, 3, [p]]]),     [1, {a:1}, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [0, 3, [p]]]),         [1, 0, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [Infinity, 3, [p]]]),  [1, Infinity, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [/./, 3, [p]]]),       [1, /./, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [true, 3, [p]]]),      [1, true, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [false, 3, [p]]]),     [1, false, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [null, 3, [p]]]),      [1, null, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [undefined, 3, [p]]]), [1, undefined, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [noop, 3, [p]]]),      [1, noop, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [Math, 3, [p]]]),      [1, Math, 3, p[0], p[1], p[2]])
  t.deepEqual(fn([1, [d, 3, [p]]]),         [1, d, 3, p[0], p[1], p[2]])
  var res =   fn([1, [NaN, 3, [p]]])
  t.deepEqual(res[0] == 1 && isNaN(res[1]) && res[2] == 3 && res[3] == p[0], true)
  t.end()
})
