const fooks = require('./src/lib')
const test = require('ava')
const sinon = require('sinon')

test('the original function is called after being wrapped', (t) => {
  const fn = sinon.spy()
  const wrapped = fooks().wrap(fn)
  wrapped()
  t.true(fn.called)
})
