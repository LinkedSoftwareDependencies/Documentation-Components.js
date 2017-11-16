function PageLogger(page) {
  this.page = page;
}

PageLogger.prototype.run = function() {
  this.page.getContents().then(console.log);
}

module.exports = PageLogger;
