const fooks = require('./src/lib')
const test = require('ava')
const sinon = require('sinon')

test('the original function is called after being wrapped', (t) => {
  const fn = sinon.spy()
  const wrapped = fooks().wrap(fn)
  wrapped()
  t.true(fn.called)
})

test('you can register a function to be run before the original function runs', (t) => {
  const original = sinon.spy()
  const pre = sinon.spy()
  const wrapped = fooks().before(pre).wrap(original)
  wrapped()
  t.true(pre.called)
})
