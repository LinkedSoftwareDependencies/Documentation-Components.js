Overrides can be used to update the values found in the configuration.

This can be useful if you import a configuration in which you want to make minor changes
but don't want to edit the original configuration.

## Example

Throughout this document there will be several examples.
These will all assume that there is a config that contains the following:

```json
{
  "@id": "ex:myHelloWorld",
  "@type": "HelloWorld",
  "say": "Hello",
  "who": [ "Belgium", "France" ],
  "translations": [
    {
      "HelloWorld:_translations_key": "Dutch",
      "HelloWorld:_translations_value": "Hallo"
    },
    {
      "HelloWorld:_translations_key": "French",
      "HelloWorld:_translations_value": "Bonjour"
    }
  ]
}
```

In this example, we assume there is a type scoped context,
which allows us to write `say`, `who`, and `translations`,
which are shorthand for their full URIs,
which would be `HelloWorld:_say`, `HelloWorld:_who`, and `HelloWorld:_translations` respectively.

## Types

| JSON-LD Shortcut         | URI                         | Description                                         |
|--------------------------|-----------------------------|-----------------------------------------------------|
| Override                 | oo:Override                 | Resources of this `@type` are considered Overrides. |

## Predicates

These are the predicates

| JSON-LD Shortcut   | URI                   | Description                                                      |
|--------------------|-----------------------|------------------------------------------------------------------|
| overrideInstance   | oo:overrideInstance   | Targets the identifier of the instance that needs to be updated. |
| overrideSteps      | oo:overrideSteps      | A list of steps to apply.                                        |

## Override

A standard Override typically has 3 predicates:
* Its type, indicating it is an Override.
* `overrideInstance` targeting the identifier of the instance that needs to be updated.
* `overrideSteps` containing a list of transformations to apply to the targeted instance.

An Override targeting our example would look as follows:

```json
{
  "@id": "ex:myObjectOverride",
  "@type": "Override",
  "overrideInstance": { "@id": "ex:myHelloWorld" },
  "overrideSteps": []
}
```

In this case the Override would not have any impact as the list of steps is empty.
Below we will cover all the possible steps that can be used.
Steps will be applied in the order they appear in the list,
so later steps have to account for changes that happened in previous steps.

## Override steps

These are all the possible types that can be used in the `overrideSteps` list.
They all apply an effect to the instance defined by the `overrideInstance` parameter in the parent Override.
Each of them makes use of the same 3 predicates defined below,
although not every step uses all 3 of them.

### Types

| JSON-LD Shortcut         | URI                         | Description                                      |
|--------------------------|-----------------------------|--------------------------------------------------|
| OverrideParameters       | oo:OverrideParameters       | Replaces parameter values of an instance.        |
| OverrideListInsertBefore | oo:OverrideListInsertBefore | Inserts into a list before a specified element.  |
| OverrideListInsertAfter  | oo:OverrideListInsertAfter  | Inserts into a list after a specified element.   |
| OverrideListInsertAt     | oo:OverrideListInsertAt     | Inserts into a list at a specified position.     |
| OverrideListRemove       | oo:OverrideListRemove       | Removes a specified element from a list.         |
| OverrideMapEntry         | oo:OverrideMapEntry         | Replaces or removes an entry in a key/value map. |

### Predicates

These are the predicates

| JSON-LD Shortcut   | URI                   | Description                                        |
|--------------------|-----------------------|----------------------------------------------------|
| overrideParameter  | oo:overrideParameter  | Identifier of the parameter that is being changed. |
| overrideTarget     | oo:overrideTarget     | The element that is relevant for this step.        |
| overrideValue      | oo:overrideValue      | The new value that will be used by this step.      |

### OverrideParameters

This step replaces some of the parameters in the target instance.
It only uses the `overrideValue` parameter.
For example:

```json
{
  "@type": "OverrideParameters",
  "overrideValue": {
    "@type": "HelloWorld",
    "who": [ "World" ]
  }
}
```

The above step would replace the `who` list from `[ "Belgium", "France" ]` to `[ "World" ]`.
All other parameters remain untouched, so the value for `say` would still be `"Hello"`.

!!! note
  The `@type` field is not necessary to make the step work,
  but is used here so type scoping still applies.
  Otherwise, we would have to use `HelloWorld:_who` instead of `who`.

#### Replacing the type

`OverrideParameters` can also be used to replace the type of an instance by providing a different value of `@type`.
In that case all other parameters of the original will be removed as those would no longer be relevant for the new type.

#### Simplified OverrideParameters

As this is the most commonly used step,
it is possible to create a simplified Override that specifically only applies this step.
The following Override configuration would have the same result as inserting the above example into the `overrideSteps` list.

```json
{
  "@id": "ex:myObjectOverride",
  "@type": "Override",
  "overrideInstance": { "@id": "ex:myHelloWorld" },
  "overrideParameters": {
    "@type": "HelloWorld",
    "who": [ "World" ]
  }
}
```

## OverrideListInsertBefore

This step allows you to insert one or more elements before a specific element in a list.
For example:

```json
{
  "@type": "OverrideListInsertBefore",
  "overrideParameter": { "@id": "HelloWorld:_who" },
  "overrideTarget": "France",
  "overrideValue": "Germany"
}
```

The above example would insert `"Germany"` before `"France"`, resulting in the list `[ "Belgium", "Germany", "France" ]`.

You can also provide a list of values to `overrideValue`,
in which case all of these would be added before the chosen element.

## OverrideListInsertAfter

This step allows you to insert one or more elements after a specific element in a list.
For example:

```json
{
  "@type": "OverrideListInsertAfter",
  "overrideParameter": { "@id": "HelloWorld:_who" },
  "overrideTarget": "France",
  "overrideValue": "Germany"
}
```

The above example would insert `"Germany"` after `"France"`, resulting in the list `[ "Belgium", "France", "Germany" ]`.

You can also provide a list of values to `overrideValue`,
in which case all of these would be added after the chosen element.

## OverrideListInsertAt

This step allows you to insert one or more elements before a specific element in a list.
For example:

```json
{
  "@type": "OverrideListInsertAt",
  "overrideParameter": { "@id": "HelloWorld:_who" },
  "overrideTarget": 1,
  "overrideValue": "Germany"
}
```

The above example would insert `"Germany"` at position 1, resulting in the list `[ "Belgium", "Germany", "France" ]`.

You can also provide a list of values to `overrideValue`,
in which case all of these would be added starting from the chose position.

## OverrideListRemove

This step allows you to remove one or more elements from a list.
It does not make use of the `overrideValue` parameter.
For example:

```json
{
  "@type": "OverrideListRemove",
  "overrideParameter": { "@id": "HelloWorld:_who" },
  "overrideTarget": "France"
}
```

The above example would insert remove `"France"`, resulting in the list `[ "Belgium" ]`.

You can also provide a list of values to `overrideTarget`,
in which case all of these would be removed.

## OverrideMapEntry

This step allows you to update an entry in a key/value map.
For example:

```json
{
  "@type": "OverrideListInsertAt",
  "overrideParameter": { "@id": "HelloWorld:_translations" },
  "overrideTarget": "Dutch",
  "overrideValue": "Goeiedag"
}
```

In the resulting key/value object, this would make it so the key `"Dutch"` has the value `"Goeiedag"`.

The `overrideValue` parameter is option for this step,
in case it is omitted, the entry with the given key will be removed instead.

!!! note
  There is no override step for inserting a new value in a key/value map
  as the order of the elements is irrelevant so the non-override solution can be used.

## Linking Overrides

As mentioned before, if multiple steps are needed, these can all be inserted in the `overrideSteps` list.
It might happen though, that there already is a configuration with an Override on an instance you want to modify,
and you do not want to change that configuration.
There can only be one Override that has a specific identifier as its `overrideInstance`,
so you can not make a second Override also targeting that identifier.
Instead, your Override would have to target the first Override as its `overrideInstance`.
During execution, first all steps of the first Override will be applied,
followed by those of the second Override.
