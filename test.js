var test = require('tap').test
  , level = require('level-test')()
  , subLevel = require('level-sublevel')
  , encode = require('./level-encode')

test('put', function (t) {
  var db = level('put')
    , enc = encode(db, 'json', 'json')

  enc.put(['hello', 'world'], { foo: 'bar' }, function () {
    db.get(JSON.stringify(['hello', 'world']), function (err, data) {
      t.deepEqual(JSON.parse(data), { foo: 'bar' })
      t.end()
    })
  })
})

test('get', function (t) {
  var db = level('get')
    , enc = encode(db, 'json', 'json')

  db.put(JSON.stringify(['hello', 'world']), JSON.stringify({ foo: 'bar' }), function () {
    enc.get(['hello', 'world'], function (err, data) {
      t.deepEqual(data, { foo: 'bar' })
      t.end()
    })
  })
})

test('del', function (t) {
  var db = level('del')
    , enc = encode(db, 'json', 'json')

  db.put(JSON.stringify(['hello', 'world']), JSON.stringify({ foo: 'bar' }), function () {
    enc.del(['hello', 'world'], function (err, data) {
      db.createReadStream()
        .once('data', function () {
          t.fail()
        })
        .once('end', function () {
          t.end()
        })
    })
  })
})


test('createReadStream', function (t) {
  var db = level('createReadStream')
    , enc = encode(db, 'json', 'json')

  db.put(JSON.stringify(['hello', 'world']), JSON.stringify({ foo: 'bar' }), function () {
    enc.createReadStream()
      .once('data', function (data) {
        t.deepEqual(data, { key: ['hello', 'world'], value: { foo: 'bar' }})
        t.end()
      })
  })
})

test('sublevel', function (t) {
  var db = subLevel(level('sublevel'))
    , enc = encode(db, 'json') // keyEncoding don't seem to work

  db.sublevel('beep').put('boop', JSON.stringify({ foo: 'bar' }), function () {
    enc.sublevel('beep').get('boop', function (err, data) {
      t.deepEqual(data, { foo: 'bar' })
      t.end()
    })
  })
})