module.exports = [
  {
    method:  "GET",
    url: "https://127.0.0.1:8443/config/ui/configuration",
    status: 200,
    headers: {
      "Date": "Thu, 20 Jun 2013 21:30:40 GMT",
      "Cache-Control": "no-cache",
      "Server": "Restlet-Framework/2.0.15",
      "Accept-Ranges": "bytes",
      "Content-Encoding": "gzip",
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json; charset=UTF-8"
    },
    response: "{\"key\": \"empty\"}"
  },
  {
    method:  "GET",
    url: "https://127.0.0.1:8443/info/login",
    status: 401,
    headers: {
      "Content-Length": "38",
      "WWW-Authenticate": "Negotiate",
      "Server": "Jetty(8.y.z-SNAPSHOT)"
    },
    response: "{\"failure\":true,\"reason\":\"iwa-failed\"}"
  },
  {
    method:  "POST",
    url: "https://127.0.0.1:8443/system/AD?_action=test",
    status: 200,
    headers: {
      "Date": "Thu, 20 Jun 2013 21:30:41 GMT",
      "Cache-Control": "no-cache",
      "Server": "Restlet-Framework/2.0.15",
      "Accept-Ranges": "bytes",
      "Content-Encoding": "gzip",
      "Transfer-Encoding": "chunked",
      "Content-Type": "application/json; charset=UTF-8"
    },
    response: "{\"name\":\"AD\",\"ok\":true}"
  },
]

