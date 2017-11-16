var http = require('http');
var fs = require('fs');

function PageServer(options) {
  this.page = options.page;
  this.port = options.port;
}

PageServer.prototype.run = function() {
  var port = this.port;
  this.page.getContents().then(function (contents) {
    console.log('Listening on http://localhost:8080, Ctrl+C to stop listening.')
    http.createServer(function (req, res) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(contents);
    }).listen(port);
  });
}

module.exports = PageServer;
