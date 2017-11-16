The Loader offers three different ways for registering modules and their components:

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

This can be done by calling: `await loader.registerAvailableModuleResources()`.

By default, Components.js will iterate over the current main module and its NPM dependencies.
It will look for an `lsd:components` entry in each `package.json` file, which is the [standard way of exposing components](../basics/exposing_components/).
If such an entry is found, the referenced modules and components are registered to the Loader.

The promise will resolve when all dependencies have been scanned,
and all registrations of those that had an `lsd:components` entry are finished.

!!! note
    If the [`scanGlobal` option](./loader/#loader-options) is enabled in the Loader,
    all [globally installed NPM modules](https://docs.npmjs.com/getting-started/installing-npm-packages-globally) are iterated as well.

!!! note
    When many dependencies are installed, scanning can introduce a noticable overhead.
    So when this overhead becomes a problem, one of the other registration methods should be used.

    This overhead will increase when `scanGlobal` is enabled.

## Registering by URL

A more hands-on way of registering modules and components is by registering them from a certain URL or path.

This can be done by calling: `await loader.registerModuleResourcesUrl('http://example.org/my/module.jsonld')`
or `await loader.registerModuleResourcesUrl('path/to/my/module.jsonld')`.

This method will read the file at the given path and register all the modules and their components it can find into the Loader.

The promise will resolve when the file has been read and all discovered modules have been fully registered.

!!! note
    `registerModuleResourcesUrl` accepts an optional second `fromPath` parameter,
    which allows you to configure the path the importing should happen relative this.
    This is useful when you want to simulate importing from a different directory.

!!! note
    JSON-LD files are not a requirement, other RDF serializations can also be interpreted automatically as mentioned [here](../getting_started/basics/config_serializations).

## Registering by triple stream

A more advanced way of registering modules is by registering them using a triple stream.

This can be done by calling: `await loader.registerModuleResourcesStream(myTripleStream)`.

This stream should contain triples using the appropriate [module and component vocabularies](../configuration/components/general/).
The triples in this stream must be defined using [triple representation from N3.js](https://www.npmjs.com/package/n3#triple-representation).
All discovered modules and components will be registered into the Loader.

The promise will resolve when the stream has been fully consumed and all discovered modules have been fully registered.

!!! note
    In the future, triples will be accepted according to the [RDFJS specification](https://github.com/rdfjs/representation-task-force/blob/master/interface-spec.md#triple).