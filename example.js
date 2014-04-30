var db = require('level-test')()('example')
  , enc = require('./level-encode')(db, 'json', 'json')

enc.put(['hello', 'world'], { foo: 'bar' }, function () {
  enc.get(['hello', 'world'], function (err, data) {
    console.log('data', data)
  })
})