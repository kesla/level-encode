var test = require('tap').test
  , level = require('level-test')()
  , encode = require('./level-encode')

test('put', function (t) {
  var db = level('put')
    , enc = encode(db, 'json', 'json')

  enc.put(['hello', 'world'], { foo: 'bar' }, function () {
    db.createReadStream().once('data', function () {
      console.log(arguments )
    })

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