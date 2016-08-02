const fn = require('../flatten')
const test = require('tape')

test('flatten', function (t) {

  t.deepEqual(fn([1, [2, 3]]),     [1, 2, 3])
  t.deepEqual(fn([[1], [2]], 3),   [1, 2, 3])
  t.deepEqual(fn([1], [2], 3),     [1, 2, 3])
  t.deepEqual(fn([1, [2, [3, 4], 5, 6], 7, 8], 9),   [1, 2, 3, 4, 5, 6, 7, 8, 9])

  t.deepEqual(args([1, [2, 3]]),   [1, 2, 3])
  t.deepEqual(args([[1], [2]], 3), [1, 2, 3])
  t.deepEqual(args([1], [2], 3),   [1, 2, 3])
  t.deepEqual(args([1, [2, [3, 4], 5, 6], 7, 8], 9), [1, 2, 3, 4, 5, 6, 7, 8, 9])

  var noop = function() {}
  var d = new Date
  t.deepEqual(args([1, ['abc', 3]]),     [1, 'abc', 3])
  t.deepEqual(args([1, [{a:1}, 3]]),     [1, {a:1}, 3])
  t.deepEqual(args([1, [0, 3]]),         [1, 0, 3])
  t.deepEqual(args([1, [Infinity, 3]]),  [1, Infinity, 3])
  t.deepEqual(args([1, [/./, 3]]),       [1, /./, 3])
  t.deepEqual(args([1, [true, 3]]),      [1, true, 3])
  t.deepEqual(args([1, [false, 3]]),     [1, false, 3])
  t.deepEqual(args([1, [null, 3]]),      [1, null, 3])
  t.deepEqual(args([1, [undefined, 3]]), [1, undefined, 3])
  t.deepEqual(args([1, [noop, 3]]),      [1, noop, 3])
  t.deepEqual(args([1, [Math, 3]]),      [1, Math, 3])
  t.deepEqual(args([1, [d, 3]]),         [1, d, 3])
  var res =   args([1, [NaN, 3]])
  t.deepEqual(res[0] == 1 && isNaN(res[1]) && res[2] == 3, true)

  t.deepEqual(fn(),          [])
  t.deepEqual(fn(0),         [0])
  t.deepEqual(fn(1),         [1])
  t.deepEqual(fn(null),      [null])
  t.deepEqual(fn(undefined), [undefined])
  t.deepEqual(fn(false),     [false])
  t.deepEqual(fn(true),      [true])

  t.end()
})



function args() {
  return fn(arguments)
}
