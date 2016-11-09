# Sinon-VCR

[![Circle CI](https://circleci.com/gh/lunchtime-labs/sinon-vcr.svg?style=shield&circle-token=ba61a22356db23763a57b80a258cd36e306d341c)](https://circleci.com/gh/lunchtime-labs/sinon-vcr)

[![Code Climate](https://codeclimate.com/github/lunchtime-labs/sinon-vcr/badges/gpa.svg)](https://codeclimate.com/github/lunchtime-labs/sinon-vcr)

Sinon-VCR integrates with the `sinon.fakeServer` method of
[SinonJS](http://www.sinonjs.org), allowing developers to select
a set of XHR responses to playback during test interactions.

## Requirements

You must have a test suite that:

1. Depends on AJAX requests from the browser.
2. Conforms to CommonJS syntax. (supports `require` calls using i.e. [Browserify](http://browserify.org/) or [Webpack](https://webpack.github.io/)).
3. Uses SinonJS.

## Setup

`npm install -D sinon-vcr`

## Usage

### Setup

1. Create a mock (see below), or see [Lunchtime Labs MockBuilder](https://github.com/lunchtime-labs/mockbuilder)
   to learn how to generate them.

2. Place 'mock' files into your 'spec' or 'test' directory where 
   they can be read.
   
   i.e. `spec/fixtures/vcr/`.

3. `Use` the mocks in your tests as AJAX responses.

Example using Karma/Browserify

`karma.conf.js`

```js
    browserify: {
      paths: [ __dirname + "/spec/fixtures/" ]
    },
```

spec/fixtures/vcr/autoplayFalse.js

```
module.exports = [
  {
    method: "GET",
    url: /www\.example\.com/,
    status: 200,
    headers: {
      "Content-Type": "application/json"
    },
    response: {
      "auoplay": "false"
    }
  }
]
```

Mocha Example

```
var VCR = require('sinon-vcr');
var autoplayFalse = require('vcr/autoplayFalse');

describe('myObject', function() {
  beforeEach(function() {
    VCR.init();
  });

  afterEach(function() {
    VCR.reset();
  });

  it('responds with autoplay false', function(done) {
    VCR.use(autoplayFalse);

    $.get("http://www.example.com/", function (response) {
      expect(response.autoplay).to.eq(false);
      done();
    });
  });
});
```

## API

### server

> Allows direct access to sinon's FakeServer

```
VCR.server.requests // Show requests received by Sinon FakeServer
```

### init:
function( capture: string )

> Intitializes VCR and sets it up to receive `use` calls.

> Optionally passing the string `capture` will allow ajax to pass through, and
> place a `debugger` statement in the `reset` method that will allow you an
> opportunity to pause Javascript exeution and save a `.har` file.

```
VCR.init(); // Mock AJAX
VCR.init('capture'); // AJAX runs normally, stop JS execution at cleanup
```

### reset:
`function ()`

> Restore the sinon fakeServer between requests.

```
VCR.reset();
```

### use:
`function (mock: object)`

> Use an XHR mock for XHR playback.

```
VCR.use(require('vcr/mock');
```

## Contributing

#### Setup

```
git clone git@github.com:lunchtime-labs/sinon-vcr.git
npm install
```

#### Usage

`gulp` or `gulp test` for TDD with Karma.

#### Tests

Uses Karma test runner with Mocha and the Jquery-Chai expectations library,
with Sinon for mocking.
