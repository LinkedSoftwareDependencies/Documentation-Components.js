Components that are passed as a parameter value to another component can inherit values from a parameter of another component.
When multiple applicable targets exists, the values from all targets will be concatenated.

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| InheritanceValue | owl:Restriction      | A link to another component that will make it inherit all its parameter values. |

## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| inheritValues        | rdfs:subClassOf         | oo:Parameter     → InheritanceValue             | Adds an inheritance value to this parameter. |
| onParameter          | owl:onProperty          | InheritanceValue → oo:Parameter                 | Sets the target parameter in the target component from which values will be inherited. |
| from                 | owl:allValuesFrom       | InheritanceValue → oo:Component                 | The target component to inherit from. |

## Example

Components:
```json
{
  "@id": "ex:MyModule",
  ...
  "components": [
    {
      "@id": "ex:MyModule/MyComponent1",
      ...
      "parameters": [
        { "@id": "ex:MyModule/MyComponent1#param1" }
      ]
    },
    {
      "@id": "ex:MyModule/MyComponent2",
      ...
      "parameters": [
        {
          "@id": "ex:MyModule/MyComponent2#param1",
          "inheritValues": {
            "@type": "InheritanceValue",
            "onParameter": "ex:MyModule/MyComponent1#param1",
            "from": "ex:MyModule/MyComponent1"
          }
        }
      ]
    }
  ]
}
```

Config:
```json
{
  ...
  "@graph": [
    {
      "@id": "ex:myComponent1",
      "@type": "ex:MyModule/MyComponent1",
      "ex:MyModule/MyComponent1#param1": "SOMETHING"
    },
    {
      "@id": "ex:myComponent2",
      "@type": "ex:MyModule/MyComponent2"
    }
  ]
}
```

When `ex:myComponent1` and `ex:myComponent2` are instantiated, `ex:myComponent2` will inherit the value `"SOMETHING"` for its `ex:MyModule/MyComponent2#param1` parameter.
