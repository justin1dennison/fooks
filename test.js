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
  let count = 1
  t.plan(4)
  const original = sinon.spy(() => {
    t.is(count, 2)
  })
  const pre = sinon.spy(() => {
    t.is(count, 1)
    count += 1
  })
  const wrapped = fooks().before(pre).wrap(original)
  wrapped()
  t.true(pre.called)
  t.true(original.called)
})

test('you can register a function to be run after the original function runs', (t) => {
  let count = 1
  t.plan(4)
  const original = sinon.spy(() => {
    t.is(count, 1)
    count += 1
  })
  const post = sinon.spy(() => {
    t.is(count, 2)
  })
  const wrapped = fooks().after(post).wrap(original)
  wrapped()
  t.true(post.called)
  t.true(original.called)
})

test('you can register pre and post functions', (t) => {
  t.plan(6)
  let count = 1
  const original = sinon.spy(() => {
    t.is(count, 2)
    count += 1
  })
  const [pre, post] = [
    sinon.spy(() => {
      t.is(count, 1)
      count += 1
    }),
    sinon.spy(() => {
      t.is(count, 3)
    }),
  ]
  const wrapped = fooks().before(pre).after(post).wrap(original)
  wrapped()
  t.true(original.called)
  t.true(pre.called)
  t.true(post.called)
})

test('the wrapped function can take the same number of arguments as the original function', (t) => {
  const original = sinon.spy((x, y) => x + y)
  const wrapped = fooks().wrap(original)
  wrapped(1, 2)
  t.true(original.called)
})

test('results are returned correctly from the wrapped function', (t) => {
  const add = (x, y) => x + y
  const original = sinon.spy(add)
  const [pre, post] = [sinon.spy(), sinon.spy()]
  const wrapped = fooks().before(pre).after(post).wrap(original)
  const result = wrapped(3, 7)
  t.true(original.called)
  t.is(result, 10)
})
