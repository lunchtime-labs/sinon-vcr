# Sinon-VCR

[![Circle CI](https://circleci.com/gh/lunchtime-labs/sinon-vcr.svg?style=shield&circle-token=ba61a22356db23763a57b80a258cd36e306d341c)](https://circleci.com/gh/lunchtime-labs/sinon-vcr)

[![Code Climate](https://codeclimate.com/github/lunchtime-labs/sinon-vcr/badges/gpa.svg)](https://codeclimate.com/github/lunchtime-labs/sinon-vcr)

Sinon-VCR integrates with the `sinon.fakeServer` method of
[SinonJS](http://www.sinonjs.org), allowing developers to dynamically select
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

1. See [Lunchtime Labs MockBuilder](https://github.com/lunchtime-labs/mockbuilder)
   for information on generating 'mocks'.
2. Place generated 'mock' files into your 'spec' or 'test' directory.
   i.e. `$YOUR_PROJECT/spec/fixtures/vcr/`.
3. Add the path for the mocks to your `browserify` or `webpack` require path.

Example using Karma/Browserify

`karma.conf.js`

```js
    browserify: {
      paths: [ __dirname + "/spec/fixtures/" ]
    },
```

4. Add to your tests:

Mocha Example

```
var VCR = require('sinon-vcr');
var autoplayFalse = require('vcr/autoplay_false');

describe('myObject', function() {
  beforeEach(function() {
    VCR.reset();
  });

  it('responds with autoplay false', function(done) {
    VCR.use(autoplayFalse);

    $.get("http://www.example.com/api/v1/publishers", function (response) {
      expect(response.autoplay).to.eq(false);
      done();
    });
  });
});
```

This example will look for mocks in:

```
spec/fixtures/vcr/autoplay_false.js
```

## API

### reset:
`function ()`

Restore the sinon fakeServer between requests.

### use:
`function (mock: string)`

Use an XHR mock for XHR playback.

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
