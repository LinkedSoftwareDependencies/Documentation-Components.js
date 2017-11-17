The Loader offers two different ways for instantiating components:

1. Instantiate by URL
2. Instantiate by triple stream

## Instantiate by URL

The easiest way to instantiate a component is by invoking a component configuration by URL or path.

This can be done by calling: `await loader.instantiateFromUrl('http://example.org/MyInstance', 'http://example.org/my/config.jsonld')`.
This returns a promise that resolves to the newly constructed instance.

This will for example instantiate the configuration at `http://example.org/my/config.jsonld` containing:
```json
{
  "@id": "http://example.org/myInstance",
  "@type": "ex:MyModule/MyComponent",
  "ex:MyModule/MyComponent#name": "John"
}
```
This requires the component `http://example.org/MyComponent` to be [registered](../registration/) via its module.

This method takes the URI of the configuration to instantiate as first parameter, and the URL or path at which it is defined as second parameter.
Note that the referenced components must be [registered](../registration/) before, otherwise the promise will reject with an error.

## Instantiate by triple stream

Similar to [registration by triple stream](../registration/#registering-by-triple-stream), components can also be instantiated by triple stream.

This can be done by calling: `await loader.getConfigConstructorFromStream('http://example.org/MyInstance', myTripleStream)`.

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/loading/instantiation)
