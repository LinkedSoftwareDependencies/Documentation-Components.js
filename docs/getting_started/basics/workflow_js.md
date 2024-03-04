## Overview

In order to inject dependencies with Components.js in non-TypeScript projects, several elements are required:

1. Module file
2. Component file
3. Component configuration file
4. Programatic instantiation

These will be explained in detail in the following sections.

### 1. Module file

A Components.js module can be declaratively defined.
As we only define a module here, no dependency on Components.js needs to be added.
The contents of a module file looks as follows:
```json
{
  "@context": "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^6.0.0/components/context.jsonld",
  "@id": "http://example.org/MyModule",
  "@type": "Module",
  "requireName": "my-module"
}
```

!!! note
    The name of this file can be freely chosen, but by convention, this should be called `components/components.jsonld`,
    as this contains a module with links to all its components.

    By convention, all files related to Components.js should be included in a `components` folder in the root of your (Node.js) module.

!!! note
    In this, and all following examples, we will be using JSON-LD files.
    This means that URIs can be prefixed as follows:

        {
          "@context": [
            "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^6.0.0/components/context.jsonld",
            { "ex": "http://example.org/" }
          ],
          "@id": "ex:MyModule",
          ...
        }
    
    Any other kind of [RDF serialization can however be used instead](./config_serializations/).

The essential values of a module are `@id`, `@type` and `requireName`, which will be explained hereafter.
All available entries of a module can be found [here](../../configuration/modules/).

#### @id

The `@id` contains the unique URI of your module, which *should* be dereferencable.
If your module is publicly available on npm, you can use its automatically generated URL `https://linkedsoftwaredependencies.org/bundles/npm/[my-module]`.

!!! note
    [https://linkedsoftwaredependencies.org/bundles/npm/](https://linkedsoftwaredependencies.org/bundles/npm/) is a semantic mirror of all available packages on npm.
    More information can be found in our [article](https://linkedsoftwaredependencies.org/articles/describing-experiments/).

#### @type

The `@type` for modules must always be `Module`.

#### requireName

The value for `requireName` must be the npm package name as it is defined in your `package.json` file.

### 2. Component file

A component must always be defined as part of a module.
Following the module from last section, the contents of a components file looks like this:
```json
{
  "@context": [
    "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^6.0.0/components/context.jsonld",
    { "ex": "http://example.org/" }
  ],
  "@id": "ex:MyModule",
  "components": [
    {
      "@id": "ex:MyModule/MyComponent",
      "@type": "Class",
      "requireElement": "MyComponent",
      "parameters": [
        {
          "@id": "ex:MyModule/MyComponent#name",
          "comment": "A name",
          "range": "xsd:string",
          "unique": true
        }
      ],
      "constructorArguments": [
        { "@id": "ex:MyModule/MyComponent#name" }
      ]
    }
  ]
}
```

In summary, this config file says that `ex:MyModule` has a component `ex:MyModule/MyComponent`.
`ex:MyModule/MyComponent` is a regular instantiatable class, which is exported by npm module `my-module` as `MyComponent`.
This component has a single parameter `ex:MyModule/MyComponent#Name`,
and its values are passed to the first argument of `MyComponent`'s constructor.

Details on all available entries of a component can be found at [here](../../configuration/components/).

The contents of this file can be made part of the main module file (such as `components/components.jsonld`),
but when multiple components are available, separate files for each component should be created.

!!! note
    The name of these file can be freely chosen, but by convention, these should be called `components/[component name].jsonld`.

When separate component files are created, they must be included in the main module file as follows:
```json
{
  "@context": "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^6.0.0/components/context.jsonld",
  "@id": "http://example.org/MyModule",
  ...
  "import": [
    "http://example.org/MyModule/MyComponent.jsonld",
    "http://example.org/MyModule/MyOtherComponent.jsonld"
  ]
}
```

As you can see, these import values are URLs.
As a best-practise, the contents of this URL should correspond to your file.
But when you are still developing, this may not be possible yet.
In this case, you can use the `lsd:importPaths` in your `package.json` file
to override the URL with a local file path as follows:
```json
  "lsd:importPaths": {
    "http://example.org/MyModule/": "components/",
  },
```
More information on this can be found on page on [exposing components](/getting_started/basics/exposing_components/#advanced-import-overriding).

### 3. Component configuration file

Component configuration files represent the semantic instantiation of a component.
These can look as follows:
```json
{
  "@context": [
    "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^6.0.0/components/context.jsonld",
    { "ex": "http://example.org/" }
  ],
  "@id": "ex:myInstance",
  "@type": "ex:MyModule/MyComponent",
  "ex:MyModule/MyComponent#name": "John"
}
```

This config file represents the instantiation of `ex:MyModule/MyComponent`
with the parameter `ex:MyModule/MyComponent#name` set to `"John"`.

In order to refer to this declarative instantiation later, it must have a unique `@id` URI.

The `@type` of our instance `ex:myInstance` simply refers to the component
that must be instantiated, which is `ex:MyModule/MyComponent` in this case.

The parameters that were defined by the component in its config file,
can now be used as keys in the configuration file.

More details on component instantiation and on how to instantiate classes that have no explicit components file
can be found [here](../../configuration/configurations/nonsemantic/).

### 4. Programatic instantiation

Up until now, modules and components are just defined semantically,
and can be created without any external dependencies.
However, in order to instantiate such declarative components programamatically,
Components.js must be installed as a dependency.

!!! note
    The npm package name of Components.js is `componentsjs`.

Components.js exposes a `ComponentsManager` module, which is responsible for loading modules, components and instantiating them.
A new components manager instance is simply created as follows:
```javascript
import { ComponentsManager } from 'componentsjs';

const manager = await ComponentsManager.build({
  mainModulePath: __dirname, // Path to your npm package's root
  moduleLoader: (registry) => registry.registerModule('path/or/url/to/my-module.jsonld'),
});
```

The invocation of `registry.registerModule` will register our module and all discoverable attached components.
All other available registration methods can be found at [here](../../loading/registration/).

In order to instantiate a component,
we must first register its declarative config file:

```javascript
await manager.configRegistry.register('path/or/url/to/config-my-component.jsonld');
```

Next, we create an actual instantiation of our declarative config instance:
```javascript
const myInstance = await manager.instantiate('http://example.org/myInstance');
```

The `instantiate` method takes as first argument the IRI (`@id`) of a component configuration.
This method resolves to an instance of the given component, as it has been instantiated according to the config file.
In this example, the `MyComponent` constructor as exported by `my-module` will be called with single argument `"John"`.

All other available instantiation methods can be found at [here](../../loading/instantiation/).

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/getting_started/basics/workflow)
