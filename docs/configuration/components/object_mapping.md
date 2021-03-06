Constructor arguments use _object mappings_ to define how to convert parameter values to JavaScript objects or arrays.

## Types

| JSON-LD Shortcut | URI                     | Description |
| ---------------- | ----------------------- | ----------- |
| ObjectMapping    | om:ObjectMapping        | An object mapping definition describing a single object. |
| ArrayMapping     | om:ArrayMapping         | An array mapping definition describing a single array. This is a subtype of ObjectMapping |
| /                | om:ObjectMappingEntry   | An object entry that defines an object key and value. |
| /                | om:ArrayMappingElements | An rdf:list where each value is a literal or an object mapping. |


## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| fields               | om:field                | oo:ObjectMapping → om:ObjectMapEntry            | Adds one or more object mapping entries to an object mapping. |
| elements             | om:elements             | oo:ArrayMapping  → om:ArrayMappingElements      | Sets the list of array mapping elements of an array mapping. |
| key, keyRaw          | om:fieldName            | oo:ObjectMappingEntry → ?                       | Sets the key of an object mapping entry. This can be a literal or a URI. |
| value                | om:fieldValue           | oo:ObjectMappingEntry → ?                       | Sets the value of an object mapping entry to another object mapping object.
| valueRaw             | om:fieldValue           | oo:ObjectMappingEntry → ?                       | Sets the value of an object mapping entry to the given literal. |
| valueRawReference    | om:fieldValueRaw        | oo:ObjectMappingEntry → ?                       | Sets the value of an object mapping entry to the given parameter, which value is a URI, but should be interpreted (and converted) as a literal. |
| [collectEntries](./entry_collection/)       | om:collectsEntriesFrom  | oo:ObjectMappingEntry → ?                       | Indicate that this object mapping entry should be instantiated for all occurences of the given parameter. |

!!! note
    `keyRaw` is a shortcut that should be used to refer to literals.
    `key` is a shortcut that refers to URIs, this should only be used in the context of [entry collection](./entry_collection/).

## Example: Simple Constructor

Component `ex:MyModule/MyComponent1` has constructor arguments with two parameters:
```json
{
  "@id": "ex:MyModule/MyComponent1",
  "@type": "Class",
  "requireElement": "MyComponent",
  "parameters": [
    { "@id": "ex:MyModule/MyComponent1#param1", "unique": true },
    { "@id": "ex:MyModule/MyComponent1#param2", "unique": true }
  ],
  "constructorArguments": [
    { "@id": "ex:MyModule/MyComponent1#param1" },
    { "@id": "ex:MyModule/MyComponent1#param2" }
  ]
}
```
Config:
```json
{
  ...
  "@type": "ex:MyModule/MyComponent1",
  "ex:MyModule/MyComponent1#param1": "A",
  "ex:MyModule/MyComponent1#param2": "B"
}
```
Instantiating this will invoke `MyComponent1("A", "B")`.

## Example: Single Array Constructor

Component `ex:MyModule/MyComponent2` has constructor arguments with a single array parameter:
```json
{
  "@id": "ex:MyModule/MyComponent2",
  "@type": "Class",
  "requireElement": "MyComponent",
  "parameters": [
    { "@id": "ex:MyModule/MyComponent2#param1" },
    { "@id": "ex:MyModule/MyComponent2#param2" }
  ],
  "constructorArguments": [
    {
      "elements": [
        "ex:MyModule/MyComponent2#param1",
        "ex:MyModule/MyComponent2#param2"
      ]
    }
  ]
}
```
Config:
```json
{
  ...
  "@type": "ex:MyModule/MyComponent2",
  "ex:MyModule/MyComponent2#param1": "A",
  "ex:MyModule/MyComponent2#param2": "B"
}
```
Instantiating this will invoke `MyComponent2(["A", "B"])`.

## Example: Single Hash Constructor

Component `ex:MyModule/MyComponent3` has constructor arguments with parameters in a single hash:
```json
{
  "@id": "ex:MyModule/MyComponent3",
  "@type": "Class",
  "requireElement": "MyComponent",
  "parameters": [
    { "@id": "ex:MyModule/MyComponent3#param1", "unique": true },
    { "@id": "ex:MyModule/MyComponent3#param2", "unique": true }
  ],
  "constructorArguments": [
    {
      "fields": [
        {
          "keyRaw": "param1",
          "value": "ex:MyModule/MyComponent3#param1"
        },
        {
          "keyRaw": "param2",
          "value": "ex:MyModule/MyComponent3#param2"
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
  "@type": "ex:MyModule/MyComponent3",
  "ex:MyModule/MyComponent3#param1": "A",
  "ex:MyModule/MyComponent3#param2": "B"
}
```
Instantiating this will invoke `MyComponent3({ param1: "A", param2: "B" })`.

## Example: Complex Constructor

Component `ex:MyModule/MyComponent4` has constructor arguments with parameters in a complex nested hash with arrays:
```json
{
  "@id": "ex:MyModule/MyComponent4",
  "@type": "Class",
  "requireElement": "MyComponent",
  "parameters": [
    { "@id": "ex:MyModule/MyComponent4#param1", "unique": true },
    { "@id": "ex:MyModule/MyComponent4#param2", "unique": true }
  ],
  "constructorArguments": [
    {
      "fields": [
        {
          "keyRaw": "param1",
          "value": "ex:MyModule/MyComponent4#param1"
        },
        {
          "keyRaw": "param2",
          "value": {
            "fields": [
              {
                "keyRaw": "param21",
                "value": "ex:MyModule/MyComponent4#param2"
              },
              {
                "keyRaw": "constant1",
                "valueRaw": "CONSTANT1"
              },
              {
                "keyRaw": "array",
                "value": {
                  "elements": [
                    "ex:MyModule/MyComponent4#param1",
                    "ex:MyModule/MyComponent4#param2",
                    {
                      "valueRaw": "CONSTANT2"
                    }
                  ]
                }
              }
            ]
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
  "@type": "ex:MyModule/MyComponent4",
  "ex:MyModule/MyComponent4#param1": "A",
  "ex:MyModule/MyComponent4#param2": "B"
}
```
Instantiating this will invoke:
```javascript
MyComponent({
  param1: "A",
  param2: {
    param21: "B",
    constant1: "CONSTANT1",
    array: [ "A", "B", "CONSTANT2" ]
  }
})
```

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/configuration/components/object_mapping)
