The most important class that is exposed by Components.js is the `ComponentsManager`,
which essentially does only two things:

1. It accepts module and component registrations, so that Components.js knows _how_ to instantiate components.
2. It instantiates components based on configurations.

There are however different ways to [register](./registration/) modules and their components,
and different ways to [instantiate](./instantiation/) these components from configurations.

This is an example of registering and instantiating by URL:
```javascript
const ComponentsManager = require('ComponentsManager').Loader;

// Create a manager
const manager = await ComponentsManager.build({
  mainModulePath: __dirname, // Path to your npm package's root
  // Register our module
  moduleLoader: (registry) => registry.registerModule('path/or/url/to/my-module.jsonld'),
});

// Register our config
await manager.configRegistry.register('path/or/url/to/config-my-component.jsonld');

// Instantiate our config
const myInstance = await manager.instantiate('http://example.org/myInstance');
```

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/loading/loader)

!!! note
    `ComponentsManager` has a strict _registration_ and _instantiation_ phase.
    This means that all registrations should happen _before_ instantiations.
    Any registrations being done _after_ an instantiation has happened will result in a runtime exception.
    
    This is needed because the `ComponentsManager` creates internal caches when the first instantiation is done to increase the efficiency of all following instantiations.

## ComponentsManager Options

The `ComponentsManager` can be built with an optional options hash.
This hash accepts the following optional entries:

| Key                       | Value | Default |
| ------------------------- | ----- | ------- |
| `mainModulePath`          | Path that should be considered the root Node module. Everything will happen relative to this path. | |
| `moduleLoader`            | Callback for registering components and modules.| Registration of all discoverable modules. |
| `configLoader`            | Callback for registering configurations. | |
| `constructionStrategy`    | A strategy for constructing instances. | `ConstructionStrategyCommonJs` |
| `dumpErrorState`          | If the error state should be dumped into `componentsjs-error-state.json` after failed instantiations. | `true` |
| `logLevel`                | The logging level. | `warn` |
| `moduleState`             | The module state. | A newly created instances on the `mainModulePath`. |
| `skipContextValidation`   | If JSON-LD context validation should be skipped. | `true` |
| `typeChecking`            | If values for parameters should be type-checked. | `true` |
