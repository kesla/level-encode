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

LevelEncoding.prototype.put = function (key, value, opts, callback) {
  if (!callback) {
    callback = opts
    opts = {}
  }
  opts = extend(opts, this.opts)
  this.db.put(key, value, opts, callback)
}

LevelEncoding.prototype.get = function (key, opts, callback) {
  if (!callback) {
    callback = opts
    opts = {}
  }
  opts = extend(opts, this.opts)
  this.db.get(key, this.opts, callback)
}

LevelEncoding.prototype.del = function (key, opts, callback) {
  if (!callback) {
    callback = opts
    opts = {}
  }
  opts = extend(opts, this.opts)
  this.db.del(key, this.opts, callback)
}

LevelEncoding.prototype.createReadStream = function (opts) {
  opts = extend(opts || {}, this.opts)
  return this.db.createReadStream(opts)
}

LevelEncoding.prototype.sublevel = function (name) {
  return LevelEncoding(this.db.sublevel(name), this.opts.valueEncoding, this.opts.keyEncoding)
}

module.exports = LevelEncoding