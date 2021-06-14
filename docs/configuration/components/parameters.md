Parameters define what kind of values can be used to instantiate a component with.

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| /                | oo:Parameter         | A parameter of a component. |

!!! note
    The type `oo:Parameter` is automatically _inferred_ when linked to a component using `oo:parameter`, so that type does not have to be defined explicitly.

## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| unique               | oo:uniqueValue          | oo:Parameter     → xsd:boolean                  | If set to true, only a single value for the given parameter in a component instance can be set. Default is false. |
| range                | rdfs:range              | oo:Parameter     → ?                            | Defines the range of a certain parameter, such as `xsd:boolean` or `xsd:string`. |
| lazy                 | oo:lazyValue          | oo:Parameter     → xsd:boolean                    | If set to true, values will not be passed directly, instead they will be passed lazily by being wrapped inside a `() => Promise<>`. Values can be retrieved by calling `await value()`. Default is false. |

!!! note
    Components.js has the ability to automatically convert specific parameter ranges to certain JavaScript datatypes.
    Currently, the following conversions of literals are supported:
    
    | Range | JavaScript |
    | ----- | ---------- |
    | `xsd:boolean` | `boolean` |
    | `xsd:integer` | `number` |
    | `xsd:number` | `number` |
    | `xsd:int` | `number` |
    | `xsd:byte` | `number` |
    | `xsd:long` | `number` |
    | `xsd:float` | `float` |
    | `xsd:decimal` | `float` |
    | `xsd:double` | `float` |
    | `rdf:JSON` | `object` (requires values to be annotated with `"@type": "@json"`, will be auto-generated with Components-Generator.js) |
    | All others | `string` |

## Example: boolean parameter

`MyModule/MyComponent#MyParam` is a parameter that accepts unique boolean values.

```json
{
  ...
  "@id": "ex:MyModule/MyComponent#MyParam",
  "comment": "Some parameter that only accepts boolean values",
  "unique": true,
  "range": "xsd:boolean"
}
```

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/configuration/components/parameters)

## Example: JSON parameter

`MyModule/MyComponent#MyParam` is a parameter that accepts unique JSON values.

```json
{
  ...
  "@id": "ex:MyModule/MyComponent#MyParam",
  "comment": "Some parameter that only accepts JSON values",
  "unique": true,
  "range": "rdf:JSON"
}
```

The JSON value passed to this parameter will be passed directly as a parsed JSON object into the constructor.

!!! note
    This JSON functionality requires values to the annotated with `"@type": "@json"`.
    When using Components-Generator.js, this `@type` will be set automatically behind the scenes using the generated context.

When instantiating MyComponent as follows, its JSON value will be passed directly into the constructor:
```json
{
  "@id": "ex:myInstance",
  "@type": "ex:MyModule/MyComponent",
  "ex:MyModule/MyComponent#MyParam": {
    "someKey": {
      "someOtherKey1": 1,
      "someOtherKey2": "abc"
    }  
  }
}
```

When not using a context, such as the one generated with Components-Generator.js, the `@type` must be set explicitly.
```json
{
  "@id": "ex:myInstance",
  "@type": "ex:MyModule/MyComponent",
  "ex:MyModule/MyComponent#MyParam": {
    "@type": "@json",
    "@value": {
      "someKey": {
        "someOtherKey1": 1,
        "someOtherKey2": "abc"
      }  
    }
  }
}
```
