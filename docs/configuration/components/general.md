**Components can be generated _automatically_ in TypeScript projects using [Components-Generator.js](https://github.com/LinkedSoftwareDependencies/Components-Generator.js)**.

Components can be configured using the following types and predicates:

## Types

| JSON-LD Shortcut          | URI                          | Description |
| ------------------------- | ---------------------------- | ----------- |
| /                         | oo:Component                 | A component. This should not be used directly as a type, instead, oo:Class, oo:AbstractClass or oo:ComponentInstance should be used. |
| Class                     | oo:Class                     | An oo:Component that refers to a JavaScript class and is instantiatable. |
| AbstractClass             | oo:AbstractClass             | An oo:Component that refers to an abstract JavaScript class and is not directly instantiatable. |
| Instance                  | oo:ComponentInstance         | An oo:Component that already is an instance and needs no further instantiation. |
| GenericTypeParameter      | oo:GenericTypeParameter      | A generic type parameter |
| GenericComponentExtension | oo:GenericComponentExtension | A resource that can be used in the extends clause of a component to refer to a generic component (`oo:component`) with generic type instances (`oo:genericTypeInstance`) |

## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| parameters           | oo:parameter            | oo:Component     → oo:Parameter                 | Attaches one or more parameters to a component. |
| constructorArguments | oo:constructorArguments | oo:Component     → rdf:list of om:ObjectMapping | Defines the list of constructor arguments of a given component. These arguments must be ObjectMappings. If this is not provided, the parameter values are passed to the constructor as a raw hash. |
| extends              | rdfs:subClassOf         | oo:Component     → oo:Component                 | Say that a certain component extends from another component, which will inherit all its parameters. |
| requireElement       | oo:componentPath        | oo:Component     → xsd:string                   | The object path to a module delimited by `.`. For example, the path to element `X` in object `{ a: { b: { X: { ... } } } }` is `a.b.X`. |
| import               | owl:imports             | ?            → ?                                | Includes the target file (URL) in this file. |

!!! note
    More information on importing can be found on the [modules configuration page](/configuration/modules/).

## Example: Abstract Component

`MyModule/MyAbstractComponent` is a component that can not be instantiated directly.
It has a set of parameter that are inherited on extensions.
The constructor arguments are not automatically inherited, but these can be extended.

```json
{
  ...
  "@id": "ex:MyModule/MyAbstractComponent",
  "@type": "AbstractClass",
  "requireElement": "path.to.MyAbstractComponent",
  "comment": "This is an abstract component that is not instantiatable.",
  "parameters": [
    { ... }
  ],
  "constructorArguments": [
    {
      "@id": "ex:MyModule/MyAbstractComponent#constructorArguments",
      "@type": "om:ObjectMapping"
      ...
    }
  ]
}
```

!!! note
    Constructor arguments that do not extend another object mapping _and_ do not define any fields themselves
    must have a `@type` of `om:ObjectMapping`.

    This is so that Components.js is able to derive that the user has made no error in its component definition
    and is certain to create an empty constructor arguments object.

## Example: Component Extension

`MyModule/MyComponent` is a component that extends the abstract component `MyModule/MyAbstractComponent`.
It inherits the parameters of its parent, and can potentially also add new ones specific to this subcomponent.
In this case, it extends the constructor arguments of its parent, and can potentially add new object mappings.

```json
{
  ...
  "@id": "ex:MyModule/MyComponent",
  "@type": "Class",
  "extends": "ex:MyModule/MyAbstractComponent",
  "requireElement": "path.to.MyComponent",
  "comment": "This is an instantiatable component.",
  "parameters": [
    { ... }
  ],
  "constructorArguments": [
    {
      "extends": "ex:MyModule/MyAbstractComponent#constructorArguments"
      ...
    }
  ]
}
```

## Example: Component Instance

`MyModule/MyComponentInstance` is a component that already is an instance.
This can not be instantiated further, but it can be used by other component configurations as argument.

```json
{
  ...
  "@id": "ex:MyModule/MyComponentInstance",
  "@type": "Instance",
  "requireElement": "path.to.MyInstance",
  "comment": "This component is an instance."
}
```

## Example: Component without Constructor Arguments

`MyModule/MyComponentRaw` is a component without constructor arguments.
When invoked with a set of parameter assignments,
the constructor will be called with a single hash,
which contains a mapping of the parameter ids to their values.

```json
{
  ...
  "@id": "ex:MyModule/MyComponentRaw",
  "@type": "Class",
  "extends": "ex:MyModule/MyAbstractComponent",
  "requireElement": "path.to.MyComponent",
  "comment": "This is an instantiatable component.",
  "parameters": [
    { "@id": "ex:MyModule/MyComponentRaw#param1" },
    { "@id": "ex:MyModule/MyComponentRaw#param2" }
  ]
}
```

Config:
```json
{
  ...
  "@type": "ex:MyModule/MyComponentRaw",
  "ex:MyModule/MyComponentRaw#param1": "A",
  "ex:MyModule/MyComponentRaw#param2": [ "B", "C" ]
}
```
Instantiating this will invoke:
```json
MyComponentRaw({
  "http://example.org/MyModule/MyComponent#param1": [ "A" ],
  "http://example.org/MyModule/MyComponent#param2": [ "B", "C" ]
})
```

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/configuration/components/general)

## Example: Generic Component Extension

`MyModule/MyComponent` is a component that extends the generic component `MyModule/MyGenericComponent` that has two generic type,
and instantiates it with `string` and `boolean`.

```json
{
  ...
  "@id": "ex:MyModule/MyComponent",
  "@type": "Class",
  "extends": {
    "@type": "GenericComponentExtension",
    "component": "ex:MyModule/MyGenericComponent",
    "genericTypeInstances": [ "xsd:string", "xsd:boolean" ]
  },
  "requireElement": "path.to.MyComponent",
  "comment": "This is an instantiatable component.",
  "parameters": [
    { ... }
  ]
}
```
