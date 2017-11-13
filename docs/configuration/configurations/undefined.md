If no module and component declaration exists, and one can not be created (easily),
a different method exists for instantiating components.
For this the following predicates can be used:

## Predicates

| JSON-LD Shortcut     | URI                     | Range         | Description |
| -------------------- | ----------------------- | ------------- | ----------- |
| requireName          | doap:name               | xsd:string    | The name of the npm package in which the component that needs instantiation can be found. |
| requireElement       | oo:componentPath        | xsd:string    | The object path to a component delimited by `.`. For example, the path to element `X` in object `{ a: { b: { X: { ... } } } }` is `a.b.X`. |
| arguments            | oo:arguments            | rdf:list of om:ObjectMapping | Defines the list of objects that should be used to construct the component. These arguments must be [ObjectMappings](../components/object_mapping/). |

## Example: Single Argument

Config:
```json
{
  ...
  "requireName": "my-module",
  "requireElement": "modules.Module1"
  "arguments": [
    { "valueRaw": "ABC" }
  ]
}
```

This will call the constructor `modules.Module1("ABC")` from NPM module `my-module`.

## Example: Complex Arguments

Config:
```json
{
  ...
  "requireName": "my-module",
  "requireElement": "modules.Module2"
  "arguments": [
    { "valueRaw": "1" },
    { "valueRaw": "2" },
    {
      "key": "a"
      "valueRaw": {
        {
          "key": "b"
          "valueRaw": "c"
        }
      }
    }
  ]
}
```

This will call the constructor `modules.Module2("1", "2", { "a": { "b": "c" } })` from NPM module `my-module`.

## Example: Nested Components

Config:
```json
{
  ...
  "requireName": "my-module",
  "requireElement": "modules.Module1"
  "arguments": [
    {
      "value": {
        "requireName": "my-other-module",
        "requireElement": "modules.Module2"
        "arguments": [
          { "valueRaw": "DEF" }
        ]
      }
    }
  ]
}
```

This will call: 
```
const my_module       = require("my-module");
const my_other_module = require("my-other-module");

my_module_.modules.Module1(
  my_other_module.modules.Module2("DEF")
)
```

!!! note
    Undefined component instantiations can also be assigned to defined component instantiation parameters,
    and the other way around.
