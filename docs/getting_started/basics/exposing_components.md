## Introduction

For modular projects, it can be useful to define components across different npm modules.

For example, a certain npm module can allow plugins to be injected.
Using Components.js, plugins could be defined using declarative components,
and this npm module could dynamically inject these components as configured by the user.
In order to do this, only the main project that needs to instantiate the components needs to depend on Components.js.
The other components, i.e. plugins, only need to expose their component files.

## Package.json discovery

Components.js can automatically discover components if they are defined in the `package.json` file of npm modules.
The URI of the module and a link to its module file needs to be defined.
For example:
```json
{
  "name": "my-plugin",
  ...
  "lsd:module": "https://linkedsoftwaredependencies.org/bundles/npm/my-plugin",
  "lsd:components": "components/components.jsonld",
  ...
}
```

Optionally, a [JSON-LD context file](https://www.w3.org/TR/json-ld/#the-context) can be linked as well,
which allows this context to be dereferenced locally:
```json
{
  "lsd:contexts": {
    "http://example.org/mycontext.jsonld": "components/context.jsonld"
  },
}
```

!!! note
    By default, JSON-LD parsers will attempt to fetch all linked contexts.
    As this can lead to some overhead, Components.js can automatically wire contexts together if they are defined in `package.json` files.
    Instead of resolving the context via HTTP(S), the context will be fetched from the local file system instead,
    as defined by the npm modules.
