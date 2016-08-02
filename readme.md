# array-funcs

> A very limited subset of array functions I use every day

## Install

```bash
npm i array-funcs
```

Package [on npm](https://www.npmjs.com/package/array-funcs)

## API

* [flatten](#flattenarg-arg-)

#### flatten([arg], [arg], [...])

Flatten nested `Array` and array-like objects like `Arguments` and `NodeList`

```js
const flatten = require('array-funcs/flatten')

// [1, 2, 3]
flatten([1, [2, 3]])

function func() {
  return flatten(arguments)
}

// [1, 2, 3]
func([1, [2, 3]])

// [p, p, p]
flatten(document.querySelectorAll('p'))
```

## License

MIT
