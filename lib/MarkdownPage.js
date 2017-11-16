var fs = require('fs');
var remark = require('remark');
var html = require('remark-html');

function MarkdownPage(options) {
  this.path = options.path;
}

MarkdownPage.prototype.getContents = function() {
  var self = this;
  return new Promise(function (resolve, reject) {
    remark()
      .use(html)
      .process(fs.readFileSync(self.path), function (err, file) {
        if (err) reject(err);
        resolve(file.contents);
      });
  });
}

module.exports = MarkdownPage;
