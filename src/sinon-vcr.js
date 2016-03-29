module.exports =
  (function () {
    window.server = sinon.fakeServer.create();

    server.respondImmediately = true;

    return server;
  })()
