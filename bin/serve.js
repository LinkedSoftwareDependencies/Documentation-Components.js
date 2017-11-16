var argv = process.argv.slice(2);
if (argv.length < 1 || /^--?h(elp)?$/.test(argv[0])) {
  console.log('usage: ' + process.argv[1] + ' uri path');
  process.exit(1);
}

var configUrl = argv[0];

var loader = new (require('lsd-components').Loader)();
loader.registerAvailableModuleResources()
  .then(function()         { return loader.instantiateFromUrl('urn:components:documentation', configUrl); })
  .then(function(instance) { return instance.run(); })
  .catch(function(error)   { console.error(error); process.exit(1); })
