## Overview

When using Components.js in a TypeScript project,
several steps can be skipped compared to [using Components.js in pure JavaScript](../workflow_js).

In order to inject dependencies with Components.js in non-TypeScript projects, several elements are required:

1. Setup module and component generation
2. Component configuration file
3. Programatic instantiation

These will be explained in detail in the following sections.

### 1. Setup module and component generation

Using the [`componentsjs-generator`](https://github.com/LinkedSoftwareDependencies/Components-Generator.js) tool,
our declarative components from our TypeScript classes.

**1. Install as a dev dependency**

```bash
npm install -D componentsjs-generator
```

or

```bash
yarn add -D componentsjs-generator
```

**2. Declare components in `package.json`**

_If you are already using Components.js, you already have this._

Add the following entry to `package.json`:

```text
{
  ...
  "lsd:module": true,
  ...
}
```

**3. _(optional)_ Add generate script**

Call `componentsjs-generator` as a npm script by adding a `scripts` entry to your `package.json`:

```text
{
  ...,
  "scripts": {
    ...
    "build": "npm run build:ts && npm run build:components",
    "build:ts": "tsc",
    "build:components": "componentsjs-generator",
    "prepare": "npm run build",
    ...
  }
}
```

This is only a _recommended_ way of calling `componentsjs-generator`,
you are free to call it in a different way that better suits your pipeline.
By default, `componentsjs-generator` will output generated components into the `components/` directory.

Please refer to the README of [`componentsjs-generator`](https://github.com/LinkedSoftwareDependencies/Components-Generator.js)
for more details on how to change the default options of this tool.

**4. _(optional)_ Ignore generated components files**

Since we automatically generate the components files,
we do not have to check them into version control systems like git.
So we can add the following line to `.gitignore`:

```text
components
```

If you do this, make sure that the components folder is published to npm by adding the following to your `package.json`:
```text
{
  ...
  "files": [
    ....
    "components/**/*.jsonld",
    "config/**/*.json",
    ....
  ],
  ....
}
```

### 2. Component configuration file

Component configuration files represent the semantic instantiation of a component.
These can look as follows:
```json
{
  "@context": [
    "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^5.0.0/components/context.jsonld",
    { "ex": "http://example.org/" }
  ],
  "@id": "ex:myInstance",
  "@type": "MyComponent",
  "MyComponent:_name": "John"
}
```

This config file represents the instantiation of the class `MyComponent`
with the parameter `name` set to `"John"`.

In order to refer to this declarative instantiation later, it must have a unique `@id` URI.

The `@type` of our instance `ex:myInstance` simply refers to the component
that must be instantiated, which is `MyComponent` in this case.

The parameters that were defined by the component in its config file,
can now be used as keys in the configuration file.

More details on component instantiation and on how to instantiate classes that have no explicit components file
can be found [here](../../configuration/configurations/nonsemantic/).

### 3. Programatic instantiation

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
