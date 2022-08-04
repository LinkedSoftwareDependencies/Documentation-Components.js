Overrides can be used to update the values found in the configuration.

This can be useful if you import a configuration in which you want to make minor changes
but don't want to edit the original configuration.

## Types

| JSON-LD Shortcut | URI         | Description                                         |
|------------------|-------------|-----------------------------------------------------|
| Override         | oo:Override | Resources of this `@type` are considered Overrides. |

## Predicates

These are the predicates

| JSON-LD Shortcut   | URI                   | Description                                                      |
|--------------------|-----------------------|------------------------------------------------------------------|
| overrideInstance   | oo:overrideInstance   | Targets the identifier of the instance that needs to be updated. |
| overrideParameters | oo:overrideParameters | Contains the values that need to be updated.                     |

## Example: single override

The example below will make it so that `ex:myHelloWorldWithOverride` will be instantiated with the value `"HELLO"`
for its `hello:say` parameter and `"BETTER WORLD"` for its `hello:hello` parameter, 
independent of what value is specified in the `ex:myHelloWorldWithOverride` instantiation.

```json
{
  "@id": "ex:myObjectOverride",
  "@type": "Override",
  "overrideInstance": { "@id": "ex:myHelloWorldWithOverride" },
  "overrideParameters": {
    "hello:say": "HELLO",
    "hello:hello": "BETTER WORLD"
  }
}
```

## Example: linked overrides

This is a continuation of the previous example.
In case an Override targets another Override,
Components.js will apply its parameters to the final instantiation,
which is `ex:myHelloWorldWithOverride` in this example.

The newer Override has priority, which means that in this case the `hello:hello` parameter 
will get the `"EVEN BETTER WORLD"` value.
Parameters that are not referenced, remain unchanged, so `hello:say` will still get the `"HELLO"` value.

```json
{
  "@id": "ex:myObjectOverride2",
  "@type": "Override",
  "overrideInstance": { "@id": "ex:myObjectOverride" },
  "overrideParameters": {
    "hello:hello": "EVEN BETTER WORLD"
  }
}
```
