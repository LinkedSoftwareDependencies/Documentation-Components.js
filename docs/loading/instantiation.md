## Config Registration

Before an instance can be created, we must first register a config file,
which contains the declarative representation of our instance.

This can be done in two ways:

### Invoking the config registry directly

After your `ComponentsManager`, you can register any number of configs via its `configRegistry`:
```javascript
await manager.configRegistry.register('path/or/url/to/config.jsonld');
```

### Registering config during components manager building

If you want to register configs during the build phase of your `ComponentsManager`,
you can do this via the `configLoader` callback:
```javascript
const manager = await ComponentsManager.build({
  mainModulePath: __dirname, // Path to your npm package's root
  configLoader: (registry) => registry.register('path/or/url/to/config-my-component.jsonld'),
});
```

Similar to [registration by triple stream](../registration/#registering-by-triple-stream),
components can also be instantiated by triple stream using the `registerStream` method.

## Instantiation

The easiest way to instantiate a component is by invoking a component configuration by URL or path.

This can be done by calling: `await manager.instantiate('http://example.org/myInstance')`.
This returns a promise that resolves to the newly constructed instance.

For example, our registered config file could have contained:
```json
{
  "@id": "http://example.org/myInstance",
  "@type": "ex:MyModule/MyComponent",
  "ex:MyModule/MyComponent#name": "John"
}
```
This requires the component `http://example.org/MyComponent` to be [registered](./registration/) via its module.

The `instantiate` method takes the IRI of the configuration to instantiate as first parameter (`@id`).
Note that the referenced components must be [registered](./registration/) before, otherwise the promise will reject with an error.

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/loading/instantiation)
