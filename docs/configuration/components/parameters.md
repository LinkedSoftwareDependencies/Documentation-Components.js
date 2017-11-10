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
| range                | rdfs:range              | oo:Parameter     → ?                            | Defines the range of a certain parameter, such as xsd:boolean or xsd:string. |

## Example: boolean parameter

`MyModule/MyComponent#MyParam` is a parameter that accepts unique boolean values.

```json
{
  ...
  "@id": "MyModule/MyComponent#MyParam",
  "comment": "Some parameter that only accepts boolean values",
  "unique": true,
  "range": "xsd:boolean"
}
```
