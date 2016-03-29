# Sinon-VCR

## This repository is under development and is not ready for use

Sinon-VCR integrates with the `sinon.fakeServer` method of
[SinonJS](http://www.sinonjs.org), allowing developers to dynamically select
a set of XHR responses to playback during test interactions.

## Requirements

You must have a test suite that:

1. Depends on AJAX requests from the browser.
2. Conforms to CommonJS syntax. (supports `require` calls using i.e. [Browserify](http://browserify.org/)
   or [Webpack](https://webpack.github.io/)).
3. Uses SinonJS.

## Setup

`npm install -D sinon-vcr`

## Usage

### Setup

1. See [MockBuilder](https://github.com/andremalan/mockbuilder) for
   information on generating 'mocks'.
2. Place generated 'mock' files into `$YOUR_PROJECT/spec/fixtures/vcr/`.

Mocha Example

```
var SinonVcr = require('sinon-vcr');

describe('myObject', function() {
  beforeEach(function() {
    SinonVcr.use("default");
  });

  it('does something', function(done) {
    SinonVcr.use("autoplay_false");

    $.get("http://www.example.com/api/v1/publishers", function (response) {
      console.log(response);

      done();
    });
  });
});
```

This example will look for mocks in:

```
spec/fixtures/vcr/default.js
spec/fixtures/vcr/autoplay_false.js
```

## API

### use:
`function (mock: string)`

Use an XHR mock for XHR playback.

`myMock` corresponds to `spec/fixtures/vcr/myMock.js`

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
