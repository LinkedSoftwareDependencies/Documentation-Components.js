The `range` of a parameter can be set to XSD datatypes such as `xsd:boolean` and `xsd:string`,
and any provided values will be type-checked against this type.

As of Components.js 5.x, ranges also support more complex algebraic data types, such as the union of certain types.

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

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| ParameterRange | oo:ParameterRange | The range of a parameter. |
| ParameterRangeUndefined | oo:ParameterRangeUndefined | Range that accepts undefined values. |
| ParameterRangeWildcard | oo:ParameterRangeWildcard | Range that accepts all values. |
| ParameterRangeArray | oo:ParameterRangeArray | Range that accepts an array of values of type `oo:parameterRangeValue`. |
| ParameterRangeRest | oo:ParameterRangeRest | Range within a tuple that represents the rest operation for the value referred to by `oo:parameterRangeValue`. |
| ParameterRangeKeyof | oo:ParameterRangeKeyof | Range that accepts a key from the component referred to by `oo:parameterRangeValue`. |
| ParameterRangeLiteral | oo:ParameterRangeLiteral | Range that accepts a literal of value `oo:parameterRangeValue`. |
| ParameterRangeUnion | oo:ParameterRangeUnion | Range that accepts a union over the ranges `oo:parameterRangeElements`. |
| ParameterRangeIntersection | oo:ParameterRangeIntersection | Range that accepts an intersection over the ranges `oo:parameterRangeElements`. |
| ParameterRangeTuple | oo:ParameterRangeTuple | Range that accepts a tuple over the ranges `oo:parameterRangeElements`. |
| ParameterRangeCollectEntries | oo:ParameterRangeCollectEntries | Range that accepts an entry collection over `oo:parameterRangeCollectEntriesParameters`. |
| ParameterRangeGenericComponent | oo:ParameterRangeGenericComponent | Range that refers to a generic component (`oo:genericTypeInstancesComponentScope`) instantiation with types (`oo:genericTypeInstance`). |
| ParameterRangeGenericTypeReference | oo:ParameterRangeGenericTypeReference | Range that refers to a generic type `oo:parameterRangeGenericType`. |
| ParameterRangeIndexed | oo:ParameterRangeIndexed | Range that accepts an indexed type for object `oo:parameterRangeIndexedObject` and index `oo:parameterRangeIndexedIndex`. |

!!! note
    The type `oo:ParameterRange` is automatically _inferred_ when linked to a parameter using `range`, so that type does not have to be defined explicitly.

## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| parameterRangeValue | oo:parameterRangeValue | oo:ParameterRangeArray, oo:ParameterRangeRest, oo:ParameterRangeKeyof, oo:ParameterRangeLiteral → ? | Value of a parameter range |
| parameterRangeElements | oo:parameterRangeElement | oo:ParameterRangeUnion, oo:ParameterRangeIntersection → oo:ParameterRange | Elements of a union or intersection |
| parameterRangeCollectEntriesParameters | oo:parameterRangeCollectEntriesParameters | oo:ParameterRangeCollectEntries → oo:ParameterRange | Collect entry parameters. |
| genericTypeInstancesComponentScope | oo:genericTypeInstancesComponentScope | oo:ParameterRangeGenericComponent → oo:Component | Component for a generic type component scope |
| genericTypeInstance | oo:genericTypeInstance | oo:ParameterRangeGenericComponent      → oo:ParameterRange | Generic type instances for a generic type component scope |
| parameterRangeGenericType | oo:parameterRangeGenericType | oo:ParameterRangeGenericTypeReference  → oo:GenericTypeParameter | Generic type reference for a generic parameter range |
| parameterRangeIndexedObject | oo:parameterRangeIndexedObject | oo:ParameterRangeIndexed → oo:ParameterRange | Object of an indexed parameter range |
| parameterRangeIndexedIndex | oo:parameterRangeIndexedIndex | oo:ParameterRangeIndexed → oo:ParameterRange | Index of an indexed parameter range |

## Example: wildcard parameter

A parameter that accepts all values.

```json
{
  ...
  "@id": "ex:MyParam",
  "range": {
    "@type": "ParameterRangeWildcard"
  }
}
```

The corresponding TypeScript range would be `any`.

## Example: optional parameter

A parameter that accepts the union of a defined boolean value or undefined.

```json
{
  ...
  "@id": "ex:MyParam",
  "range": {
    "@type": "ParameterRangeUnion",
    "parameterRangeElements": [
      "xsd:boolean",
      {
        "@type": "ParameterRangeUndefined"
      }
    ]
  }
}
```

The corresponding TypeScript range would be `boolean | undefined`.

## Example: array parameter

A parameter that accepts an array of string values.

```json
{
  ...
  "@id": "ex:MyParam",
  "range": {
    "@type": "ParameterRangeArray",
    "parameterRangeValue": "xsd:string"
  }
}
```

The corresponding TypeScript range would be `string[]`.

## Example: tuple parameter

A parameter that accepts a tuple type.

```json
{
  ...
  "@id": "ex:MyParam",
  "range": {
    "@type": "ParameterRangeTuple",
    "parameterRangeElements": [
      "xsd:boolean",
      "xsd:boolean",
      {
        "@type": "ParameterRangeRest",
        "parameterRangeValue": {
          "@type": "ParameterRangeArray",
          "parameterRangeValue": "xsd:string"
        }
      }
    ]
  }
}
```

The corresponding TypeScript range would be `[ boolean, boolean, ...string[] ]`.

## Example: generic component

A parameter that accepts the generic instantiation of a component.

```json
{
  ...
  "@id": "ex:MyParam",
  "range": {
    "@type": "ParameterRangeGenericComponent",
    "genericTypeInstancesComponentScope": "ex:MyGenericComponent",
    "genericTypeInstance": [ "xsd:boolean", "xsd:string" ]
  }
}
```

The corresponding TypeScript range would be `MyGenericComponent<boolean, string>`.

## Example: generic type reference

A parameter that accepts a generic of a component.
Note that this generic should be defined in the component that owns this parameter.

```json
{
  ...
  "@id": "ex:MyParam",
  "range": {
    "@type": "ParameterRangeGenericTypeReference",
    "parameterRangeGenericType": "ex:MyComponent__generic_T"
  }
}
```

The corresponding TypeScript range would be `T`, where `T` is a genetic type of `MyComponent`.
