module.exports = function fooks() {
  const befores = []
  const afters = []

  /**TODO: */
  function wrap(fn) {
    return function wrapped(...args) {
      befores.forEach((f) => f(...args))
      const results = fn(...args)
      afters.forEach((f) => f(...args))
      return results
    }
  }

  /**TODO: */
  function before(fn) {
    befores.push(fn)
    return this
  }

  /**TODO: */
  function after(fn) {
    afters.push(fn)
    return this
  }

  return { wrap, before, after }
}
