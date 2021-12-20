## Introduction

For modular projects, it can be useful to define components across different npm modules.

For example, a certain npm module can allow plugins to be injected.
Using Components.js, plugins could be defined using declarative components,
and this npm module could dynamically inject these components as configured by the user.
In order to do this, only the main project that needs to instantiate the components needs to depend on Components.js.
The other components, i.e. plugins, only need to expose their component files.

## Package.json discovery

Components.js can automatically discover components in packages if their `package.json` contains an `"lsd:module": true` entry.

For example:
```json
{
  "lsd:module": true,
  ...
}
```

By enabling this flag, this module will

* receive a module identifier in the form of `https://linkedsoftwaredependencies.org/bundles/npm/my-plugin`;
* expose its components if `components/components.jsonld` exists;
* expose its context if `components/context.json` exists;
* expose its components and config folder if `components/` or `config/` exist.

For instance, the `"lsd:module": true` is typically equivalent to:
```json
{
  "name": "my-plugin",
  ...
  "lsd:module": "https://linkedsoftwaredependencies.org/bundles/npm/my-plugin",
  "lsd:components": "components/components.jsonld",
  "lsd:contexts": {
    "http://example.org/mycontext.jsonld": "components/context.jsonld"
  },
  "lsd:importPaths": {
    "http://example.org/myconfig.jsonld": "config/myconfig.jsonld",
    "http://example.org/otherconfigs/": "config/otherconfigs/",
  },
  ...
}
```

`"lsd:module": true` can be considered a convenience flag if the default settings above are sufficient for your project.
If you however want to adapt any of the above default entries,
you can make use of the more advanced options below.

### Advanced: Custom module URL

The URL of your module can be defined using `"lsd:module"`:
```json
{
  "name": "my-plugin",
  ...
  "lsd:module": "https://linkedsoftwaredependencies.org/bundles/npm/my-plugin",
  ...
}
```

### Advanced: Exposing components

Exposing the modules file of your package can be done using `"lsd:components"`:
```json
{
  "name": "my-plugin",
  ...
  "lsd:module": "https://linkedsoftwaredependencies.org/bundles/npm/my-plugin",
  "lsd:components": "components/components.jsonld",
  ...
}
```

### Advanced: Context overriding

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

!!! note
    If your package is available on [npm](https://www.npmjs.com/), and you have properly used the `lsd:components` entry in your `package.json` file,
    then your context file will automatically be published on the [Linked Software Dependencies npm mirror](https://linkedsoftwaredependencies.org/).
    The URL of your context file is `https://linkedsoftwaredependencies.org/bundles/npm/[packagename]/[version or range]/components/context.jsonld`.
    For example, the latest context file of Components.js is available at `https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/*/components/context.jsonld`.
    In that case, you are encouraged to use these URLs as keys `lsd:contexts`.

### Advanced: Import overriding

Similar to context file overriding, import paths can also be overridden.
This is useful when you want to avoid expensive HTTP lookups for files in cases where you have the relevant files available locally.
Additionally, this can be used during development when you make changes to your imported file that has not been made available via its URL (yet).

The `lsd:importPaths` refers to a hash that maps URL prefixes to local path prefixes:
```json
{
  "lsd:importPaths": {
    "http://example.org/myconfig.jsonld": "config/myconfig.jsonld",
    "http://example.org/otherconfigs/": "config/otherconfigs/",
  },
}
```

!!! note
    If your package is available on [npm](https://www.npmjs.com/),
    then your import paths will automatically be published on the [Linked Software Dependencies npm mirror](https://linkedsoftwaredependencies.org/).
    The URL of this will be `https://linkedsoftwaredependencies.org/bundles/npm/[packagename]/[version or range]/[importPathValue]`.
    For example, the latest version of `@comunica/actor-init-hello-world` with import path value `config/` will be exposed at `https://linkedsoftwaredependencies.org/bundles/npm/@comunica/actor-init-hello-world/*/config/`.
    In that case, you are encouraged to use these URLs as keys `lsd:importPaths`.
