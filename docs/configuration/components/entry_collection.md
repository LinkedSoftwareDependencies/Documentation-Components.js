`om:collectsEntriesFrom` allows objects to be mapped based on a dynamic set of entries.

## Behaviour

If this is present in an object mapping entry, this means that the key and value of this entry is assumed to be dynamic.
This means that all values from the collection entry's target parameter will be iterated.
For each value, the predicate pointed to by `key` will be set as key for this entry,
and the predicate to pointed by `value` will be set as the value for this entry.

!!! note
    In the case entry collection, the key and value can have several special values.

    If the URI is `rdf:subject`, the URI of the component instance is assigned.
    If the URI is `rdf:object`, the URI of the parameter value is assigned.

## Example

A constructor mapping of component `ex:MyModule/MyComponent` with parameter `ex:MyModule/MyComponent#MyParam` can be defined as follows:

```json
{
  "@id": "ex:MyModule/MyComponent",
  "@type": "Class",
  "requireElement": "MyComponent",
  "parameters": [
    { "@id": "ex:MyModule/MyComponent#MyParam" }
  ],
  "constructorArguments": [
    {
      "fields": [
        {
          "collectEntries": "ex:MyModule/MyComponent#MyParam",
          "key": "ex:a",
          "value": "ex:b"
        }
      ]
    }
  ]
}
```
Config:
```json
{
  "@type": "ex:MyModule/MyComponent",
  "ex:MyModule/MyComponent#MyParam": [
    { "ex:a": "A1", "ex:b": "B1" },
    { "ex:a": "A2", "ex:b": "B2" },
    { "ex:a": "A3", "ex:b": "B3" }
  ]
}
```
Instantiating this will invoke `c({ A1: "B1", A2: "B2", A3: "B3" })`.

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/configuration/components/entry_collection)
