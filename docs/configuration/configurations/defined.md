The easiest way to instantiate a component is by referencing its defined parameters.
Each instance can optionally have an `@id`, to make it easily referencable and possibly reusable.

## Example: Simple parameter values

For example, assuming a component `ex:MyModule/MyComponent1` defines the following parameters:
```json
{
  ...
  "@id": "ex:MyModule/MyComponent1",
  "parameters": [
    {
      "@id": "ex:MyModule/MyComponent1#param1"
    },
    {
      "@id": "ex:MyModule/MyComponent1#param2",
      "unique": true
    },
    {
      "@id": "ex:MyModule/MyComponent1#param3",
      "default": "ABC",
      "unique": true
    }
  ],
  ...
}
```

The following instantiation (i.e. config) can be defined:
```json
{
  ...
  "@type": "ex:MyModule/MyComponent1",
  "ex:MyModule/MyComponent#param1": "A",
  "ex:MyModule/MyComponent#param1": "B",
  "ex:MyModule/MyComponent#param2": "C"
}
```

This will lead to an instantiation of `ex:MyModule/MyComponent1`
with the following parameter mapping:

| Parameter                        | Value          |
| -------------------------------- | -------------- |
| `ex:MyModule/MyComponent#param1` | `[ "A", "B" ]` |
| `ex:MyModule/MyComponent#param2` | `"C"`          |
| `ex:MyModule/MyComponent#param3` | `"ABC"`        |

## Example: Nested Component Instantiation

Configs can however also be nested, so that component instances can be passed as parameter values to other components.

For example:
```json
{
  ...
  "@type": "ex:MyModule/MyComponent1",
  "ex:MyModule/MyComponent#param1": "A",
  "ex:MyModule/MyComponent#param1": "B",
  "ex:MyModule/MyComponent#param2": {
    "@type": "ex:MyModule/MyComponent1",
    "ex:MyModule/MyComponent#param1": "A"
  }
}
```

This will lead to an instantiation of `ex:MyModule/MyComponent1`
that has values `"A"` and `"B"` for `ex:MyModule/MyComponent#param1`,
but has _another_ instance of `ex:MyModule/MyComponent1` as value for `ex:MyModule/MyComponent#param2`.
This other instance can have different parameter assignments, as it is a completely new instance.

## Example: Reusable Instances

Using `@id`, component configurations can be uniquely identified.
This allows instances to be defined once, and reused on different locations.

For example:
```json
{
  ...
  "@id": "ex:myRootComponent",
  "@type": "ex:MyModule/MyComponent1",
  "ex:MyModule/MyComponent#param1": {
    "@id": "ex:myComponent1"
    "@type": "ex:MyModule/MyOtherComponent",
    "ex:MyModule/MyOtherComponent#param1": "A"
  },
  ex:MyModule/MyComponent#param2": {
    "@id": "ex:myComponent1"
  }
}
```

This will create a component instance with id `ex:myRootComponent`.
For `ex:MyModule/MyComponent#param1`, it will be assigned a new instance of `ex:MyModule/MyOtherComponent` with id `ex:myComponent1`.
For `ex:MyModule/MyComponent#param2`, instead of creating a new instantiation, it will be assigned the previously created instance `ex:myComponent1`.

!!! note
    Component instantiations can not containg self-references.
    For example, a component instance can have a reference to itself in one of its parameters, or its children.