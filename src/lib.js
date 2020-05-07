module.exports = function fooks() {
  const wrap = (fn) => (...args) => fn(...args)

  return { wrap }
}
