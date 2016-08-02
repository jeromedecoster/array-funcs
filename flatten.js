module.exports = function() {
  var arr = []
  for (var i = 0, n = arguments.length; i < n; i++) {
    add(arr, arguments[i])
  }
  return arr
}

function add(arr, data) {
  if (iterable(data)) {
    for (var i = 0, n = data.length; i < n; i++) {
      add(arr, data[i])
    }
  } else {
    arr.push(data)
  }
}

function iterable(data) {
  if (Array.isArray(data)) return true
  return data != null
    && typeof data === 'object'
    && typeof data.length === 'number'
    && (typeof data.item === 'function' || typeof data.callee == 'function')
}
