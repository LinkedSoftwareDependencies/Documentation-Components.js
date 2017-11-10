Parameters can have default values when parameters are not given an explicit value during component instantiation.

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| /                | oo:DefaultScoped     | A parameter value that is scoped in a certain component (and its subcomponents). |

## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| default              | oo:defaultValue         | oo:Parameter     → ?                            | Sets a default parameter value, which is overridable during instantiation. |
| defaultScoped        | oo:defaultScoped        | oo:Parameter     → oo:DefaultScoped             | Adds a scoped default value to the parameter. |
| defaultScope         | oo:defaultScope         | oo:DefaultScoped → oo:Component                 | Defines the scope of a scoped value. |
| defaultScopedValue   | oo:defaultScopedValue   | oo:DefaultScoped → ?                            | Defines the value of a scoped value. |

!!! note
    Multiple scopes can be defined.

!!! note
    A scoped default value has priority over a regular default value. This means that regular default values can be used as a fallback value if no scope is applicable.

## Example: Default

`MyModule/MyComponent#MyParam1` is a parameter with a default value in all cases:
```json
{
  ...
  "@id": "MyModule/MyComponent#MyParam1",
  "default": "this is the default value"
}
```

## Example: Default Scoped

`MyModule/MyComponent#MyParam2` is a parameter with a default value that is scoped to only be applicable on component `MyModule/MyComponent`:
```json
{
  ...
  "@id": "MyModule/MyComponent#MyParam2",
  "defaultScoped": {
    "defaultScope": "MyModule/MyComponent",
    "defaultScopedValue": "this is the default value for MyComponent"
  }
}
```

## Example: Combined Defaults

`MyModule/MyComponent#MyParam3` is a parameter with different value scopes and a fallback default:
```json
{
  ...
  "@id": "MyModule/MyComponent#MyParam3",
  "defaultScoped": [
    {
      "defaultScope": "MyModule/MyComponent1",
      "defaultScopedValue": "this is the default value for MyComponent1"
    },
    {
      "defaultScope": "MyModule/MyComponent2",
      "defaultScopedValue": "this is the default value for MyComponent2"
    }
  ],
  "default": "this is the default value for all other components"
}
```
