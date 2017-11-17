The most important class that is exposed by Components.js is the `Loader`,
which essentially does only two things:

1. It accepts module and component registrations
2. It instantiates components based on configurations.

There are however different ways to [register](./registration/) modules and their components,
and different ways to [instantiate](./instantiation/) these components from configurations.

This is an example of registering and instantiating by URL:
```javascript
const Loader = require('lsd-components').Loader;

const loader = new Loader();
await loader.registerModuleResourcesUrl('path/or/url/to/my-module.jsonld');
const myComponent = await loader.instantiateFromUrl(
    'http://example.org/myInstance', 'path/or/url/to/config-my-component.jsonld');
```

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/loading/loader)

!!! note
    Loader has a strict _registration_ and _instantiation_ phase.
    This means that all registrations should happen _before_ instantiations.
    Any registrations being done _after_ an instantiation has happened will result in a runtime exception.
    
    This is needed because the Loader creates internal caches when the first instantiation is done to increase the efficiency of all following instantiations.

## Loader Options

The Loader can be constructed with an optional options hash.
This hash accepts the following optional entries:

| Key                       | Value | Default |
| ------------------------- | ----- | ------- |
| `scanGlobal`              | If Components.js modules and JSON-LD contexts should be scanned in all globally installed NPM modules as well, instead of only the locally installed modules. | `false` |
| `absolutizeRelativePaths` | If component configurations with relative file path strings (`"file://..."`) should be made absolute to the main module path (`"file:///..."`). | `true` |
| `contexts`                | A hash with JSON-LD contexts. Entries with key a JSON-LD context URI and values a string representation of a JSON-LD context. | Collected from all scanned modules. |
| `mainModulePath`          | Path that should be considered the root Node module. Everything will happen relative to this path. | The path of the _closest_ NPM module, which is determined by iteratively checking the parents of the Node working directory. |
