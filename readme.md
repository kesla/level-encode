# level-encode[![build status](https://secure.travis-ci.org/kesla/level-encode.png)](http://travis-ci.org/kesla/level-encode)

Return a levelup-instance with a certain encoding

## Installation

```
npm install level-encode
```

## Example

### Input

```javascript
var db = require('level-test')()('example')
  , enc = require('./level-encode')(db, 'json', 'json')

enc.put(['hello', 'world'], { foo: 'bar' }, function () {
  enc.get(['hello', 'world'], function (err, data) {
    console.log('data', data)
  })
})
```

### Output

```
data { foo: 'bar' }
```

## Licence

Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

