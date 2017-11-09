# Components.js Documentation

This is the documentation for [Components.js], a semantic dependency injection framework.

Contribute to this documentation on [GitHub].

## Introduction

Components.js is a [dependency injection] framework for JavaScript applications.

!!! note
    Only [Node.js] modules are supported at the moment.

Instead of hard-wiring software components together, Components.js allows these components to be _instantiated_ and _wired together_ declaratively using _semantic configuration files_.
The advantage of these semantic configuration files is that software components can be uniquely and globally identified using [URIs].

Configurations can be written in any [RDF] serialization, such as [JSON-LD].

This software is aimed for developers who want to build _modular_ and _easily configurable_ and _rewireable_ JavaScript applications.

## Quick Start

Components.js can be installed using npm:
```bash
$ [sudo] npm install lsd-components
```

#### 1. Define your module and its components

`my-module.jsonld`:
```json
{
  "@context": [
    "https://linkedsoftwaredependencies.org/contexts/components.jsonld",
    { "@vocab": "http://example.org/" }
  ],
  "@id": "MyModule",
  "@type": "Module",
  "requireName": "my-module",
  "components": [
    {
      "@id": "MyModule/MyComponent",
      "@type": "Class",
      "requireElement": "MyComponent",
      "parameters": [
        { "@id": "MyModule/MyComponent#name" }
      ],
      "constructorArguments": [
        "elements": [ "MyModule/MyComponent#name" ]
      ]
    }
  ]
}
```

The npm module `my-module` exports a component with the name `MyComponent`.

The constructor of `MyComponent` takes a single `name` argument.

#### 2. Create a configuration file containing a component instantiation

`config-my-component.jsonld`:
```json
{
  "@context": [
    "https://linkedsoftwaredependencies.org/contexts/components.jsonld",
    {
      "@vocab": "http://example.org/"
      "name": "MyModule/MyComponent#name"
    }
  ],
  "@id": "http://example.org/myInstance",
  "@type": "MyModule/MyComponent",
  "name": "John"
}
```

This configuration is a semantic representation of the instantiation of `MyComponent` with `name` set to `"John"`.

#### 3. Instantiate your component programmatically

```javascript
const Loader = require('lsd-components').Loader;

const loader = new Loader();
await loader.registerModuleResourcesUrl('path/or/url/to/my-module.jsonld');
const myComponent = await loader.instantiateFromUrl(
    'http://example.org/myInstance', 'path/or/url/to/config-my-component.jsonld');
```

`myComponent` is an instance of type `MyComponent`, as defined in the config file.

Please refer to the remainder of this documentation for more details on each of these parts.

[Components.js]: https://github.com/LinkedSoftwareDependencies/Components.js
[GitHub]: https://github.com/LinkedSoftwareDependencies/Documentation-Components.js
[dependency injection]: https://martinfowler.com/articles/injection.html
[Node.js]: https://nodejs.org/en/
[URIs]: https://www.w3.org/wiki/URI
[RDF]: https://www.w3.org/RDF/
[JSON-LD]: https://json-ld.org/
