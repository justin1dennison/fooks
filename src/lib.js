module.exports = function fooks() {
  const befores = []
  function wrap(fn) {
    return function wrapped(...args) {
      befores.forEach(f => f(...args))
      return fn(...args)
    }
  }
  function before(fn) {
    befores.push(fn)
    return this
  }

  return { wrap, before }
}
