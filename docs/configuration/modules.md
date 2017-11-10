Modules can be configured using the following type and predicates:

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| Module           | oo:Module            | A module that can contain components. |

## Predicates

| JSON-LD Shortcut     | URI                     | Domain       → Range                        | Description |
| -------------------- | ----------------------- | ------------------------------------------- | ----------- |
| components           | oo:component            | oo:Module    → oo:Component                 | Attaches one or more components to a module. |
| import               | owl:imports             | ?            → xsd:string                   | Includes the target file (local path or URL) in this file. |
| requireName          | doap:name               | oo:Module    → xsd:string                   | The name of the npm package as defined in the `package.json` file. |
| comment              | rdfs:comment            | ?            → xsd:string                   | The comment of a thing. |

## Example

A module can be defined as follows:
```json
{
  "@context": "https://linkedsoftwaredependencies.org/contexts/components.jsonld",
  "@id": "MyModule",
  "@type": "Module",
  "requireName": "my-module",
  "comment": "This is my awesome module!",
  "components": [
    ...
  ],
  "import": [
    "path/to/some/component.jsonld",
    "other/component/in/another/serialization.ttl",
    "http://example.org/yet/another/component.jsonld"
  ]
}
```
