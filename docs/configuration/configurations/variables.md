Variables can be filled in as parameter value,
where the actual variable's value can be provided in code during instantiation.

This can be useful if your application for example accepts command line parameters that you want to pass to components at initialization time.

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| Variable         | oo:Variable          | Resources of this `@type` are considered variables. |

## Example

For example, assuming a component `ex:MyModule/MyComponent1` defines the following parameter:
```json
{
  ...
  "@id": "ex:MyModule/MyComponent1",
  "parameters": [
    {
      "@id": "ex:MyModule/MyComponent1#param1"
    }
  ],
  ...
}
```

The following instantiation (i.e. config) can be defined:
```json
{
  ...
  "@id": "http://example.org/MyInstance",
  "@type": "ex:MyModule/MyComponent1",
  "ex:MyModule/MyComponent1#param": {
    "@id": "urn:variables:myVariable",
	"@type": "Variable"
  }
}
```

Variable values can be set during instantiation using the `variables` option:
```typescript
await loader.instantiateFromUrl('http://example.org/MyInstance', 'http://example.org/my/config.jsonld', undefined, {
  variables: {
    'urn:variables:myVariable': 'abc',
  },
});
```

This will lead to an instantiation of `ex:MyModule/MyComponent1`
with the following parameter mapping:

| Parameter                        | Value          |
| -------------------------------- | -------------- |
| `ex:MyModule/MyComponent#param`  | `"abc"` |

!!! note
    Any number of variables can be defined during instantiation.
	If a variable remains undefined, an exception will be thrown during instantiation.

!!! note
    Variables can be reused across different component parameters.