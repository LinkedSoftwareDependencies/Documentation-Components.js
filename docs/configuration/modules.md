Modules can be configured using the following type and predicates:

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| Module           | oo:Module            | A module that can contain components. |

## Predicates

| JSON-LD Shortcut     | URI                     | Domain       → Range                        | Description |
| -------------------- | ----------------------- | ------------------------------------------- | ----------- |
| components           | oo:component            | oo:Module    → oo:Component                 | Attaches one or more components to a module. |
| import               | owl:imports             | ?            → ?                            | Includes the target file (URL) in this file. |
| requireName          | doap:name               | oo:Module    → xsd:string                   | The name of the npm package as defined in the `package.json` file. |
| comment              | rdfs:comment            | ?            → xsd:string                   | The comment of a thing. |

## Example

A module can be defined as follows:
```json
{
  "@context": "https://linkedsoftwaredependencies.org/bundles/npm/componentsjs/^4.0.0/components/context.jsonld",
  "@id": "http://example.org/MyModule",
  "@type": "Module",
  "requireName": "my-module",
  "comment": "This is my awesome module!",
  "components": [
    ...
  ],
  "import": [
    "http://example.org/path/to/some/component.jsonld",
    "http://example.org/other/component/in/another/serialization.ttl"
  ]
}
```

!!! note
    Import sources [can be overriden using the `lsd:importPaths` entry](/getting_started/basics/exposing_components/) in your `package.json` file.
