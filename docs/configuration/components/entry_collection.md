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

A constructor mapping of component `c` with parameter `p` can be defined as follows:

```json
{
  "@id": "c",
  ...
  "constructorArguments": [
    {
      "fields": [
        {
          "collectEntries": "p",
          "key": "a",
          "value": "b"
        }
      ]
    }
  ]
}
```
Config:
```json
{
  "@type": "c",
  "p": [
    { "a": "A1", "b": "B1" },
    { "a": "A2", "b": "B2" },
    { "a": "A3", "b": "B3" }
  ]
}
```
Instantiating this will invoke `c({ A1: "B1", A2: "B2", A3: "B3" })`.
