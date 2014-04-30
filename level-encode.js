var extend = require('xtend')
  , LevelEncoding = function (db, valueEncoding, keyEncoding) {
      if (!(this instanceof LevelEncoding))
        return new LevelEncoding(db, valueEncoding, keyEncoding)

      this.db = db
      this.opts = {
          valueEncoding: valueEncoding || 'utf8'
        , keyEncoding: keyEncoding || 'utf8'
      }
    }

LevelEncoding.prototype.put = function (key, value, callback) {
  this.db.put(key, value, this.opts, callback)
}

LevelEncoding.prototype.get = function (key, callback) {
  this.db.get(key, this.opts, callback)
}

LevelEncoding.prototype.del = function (key, callback) {
  this.db.del(key, this.opts, callback)
}

module.exports = LevelEncoding