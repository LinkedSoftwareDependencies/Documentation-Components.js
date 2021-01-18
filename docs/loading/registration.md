The `ComponentsManager` offers three different ways for registering modules and their components:

1. By automatic NPM module scanning
2. By URL
3. By triple stream

!!! note
    All of these registration methods return void promises.
    They resolve when they finish registration,
    and they reject on errors.
    
    The caller is responsible for ensuring that registrations are finished before instantiations are being done,
    otherwise undefined behaviour may occur.
    
    This could for example by done by using the `await` keyword.

## Registering by Automatic NPM Module Scanning

In most cases, the most convenient way to register modules and components
is by letting Components.js look for them automatically.
This is the default mode of operation when creating a `ComponentsManager` when no `moduleLoader` is passed:

```javascript
import { ComponentsManager } from 'componentsjs';

const manager = await ComponentsManager.build({
  mainModulePath: __dirname, // Path to your npm package's root
});
```

By default, Components.js will iterate over the current main module and its NPM dependencies.
It will look for an `lsd:components` entry in each `package.json` file, which is the [standard way of exposing components](../basics/exposing_components/).
If such an entry is found, the referenced modules and components are registered to the Loader.
Example `package.json` contents:

```json
{
  ...
  "lsd:module": true,
  ...
}
```

!!! note
    When many dependencies are installed, scanning can introduce a noticable overhead.
    So when this overhead becomes a problem, one of the other registration methods should be used.

## Registering by URL

A more hands-on way of registering modules and components is by registering them from a certain URL or path.
For this, you can override the `moduleLoader` callback when building your `ComponentsManager`.

For example:
```javascript
const manager = await ComponentsManager.build({
  mainModulePath: __dirname, // Path to your npm package's root
  moduleLoader: async(registry) => {
	await registry.registerModule('http://example.org/my/module.jsonld');
	await registry.registerModule('path/to/my/module.jsonld');
  },
});
```

This method will read the file at the given path and register all the modules and their components it can find into the `ComponentsManager`.

The promise will resolve when the file has been read and all discovered modules have been fully registered.

!!! note
    JSON-LD files are not a requirement, other RDF serializations can also be interpreted automatically as mentioned [here](../getting_started/basics/config_serializations).

## Registering by triple stream

A more advanced way of registering modules is by registering them using a triple stream.

For example:
```javascript
const manager = await ComponentsManager.build({
  mainModulePath: __dirname, // Path to your npm package's root
  moduleLoader: async(registry) => {
	await registry.registerModuleStream(myTripleStream);
  },
});
```

This stream should contain triples using the appropriate [module and component vocabularies](../configuration/components/general/).
The triples in this stream must be defined using [quad representation from RDF/JS](http://rdf.js.org/data-model-spec/#quad-interface).
All discovered modules and components will be registered into the `ComponentsManager`.

The promise will resolve when the stream has been fully consumed and all discovered modules have been fully registered.

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/loading/registration)
