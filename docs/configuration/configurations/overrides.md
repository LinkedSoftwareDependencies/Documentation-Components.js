Overrides can be used to update the values found in the configuration.

This can be useful if you import a configuration in which you want to make minor changes
but don't want to edit the original configuration.

In case you override the type of the target instance,
all of its original parameter values will be removed as they would no longer be consistent with the new type.

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

Assume we have the following in our original configuration:

```json
{
  "@id": "ex:myHelloWorldWithOverride",
  "@type": "hello:HelloWorld",
  "hello:say": "HI",
  "hello:hello": "WORLD",
  "hello:punctuation": "!"
}
```

Importing the config below will make it so that `ex:myHelloWorldWithOverride` will be instantiated with the value `"HELLO"`
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

## Example: overriding the type

The following example overrides the type of the target instance.
This will remove all the original parameters of `ex:myHelloWorldWithOverride`.
In this case, this means that this will result in `ex:myHelloWorldWithOverride`
being an instance of `ex:GreetingsWorld` with only 1 parameter: `greetings:say`.
The values for `hello:say`, `hello:hello`, and `hello:punctuation` will be gone.

```json
{
  "@id": "ex:myObjectOverride",
  "@type": "Override",
  "overrideInstance": { "@id": "ex:myHelloWorldWithOverride" },
  "overrideParameters": {
    "@type": "ex:GreetingsWorld",
    "greetings:say": "GREETINGS WORLD!"
  }
}
```
