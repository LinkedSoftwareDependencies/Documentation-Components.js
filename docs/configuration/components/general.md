Components can be configured using the following types and predicates:

## Types

| JSON-LD Shortcut | URI                  | Description |
| ---------------- | -------------------- | ----------- |
| /                | oo:Component         | A component. This should not be used directly as a type, instead, oo:Class, oo:AbstractClass or oo:ComponentInstance should be used. |
| Class            | oo:Class             | An oo:Component that refers to a JavaScript class and is instantiatable. |
| AbstractClass    | oo:AbstractClass     | An oo:Component that refers to an abstract JavaScript class and is not directly instantiatable. |
| Instance         | oo:ComponentInstance | An oo:Component that already is an instance and needs no further instantiation. |

## Predicates

| JSON-LD Shortcut     | URI                     | Domain           → Range                        | Description |
| -------------------- | ----------------------- | ----------------------------------------------- | ----------- |
| parameters           | oo:parameter            | oo:Component     → oo:Parameter                 | Attaches one or more parameters to a component. |
| constructorArguments | oo:constructorArguments | oo:Component     → rdf:list of om:ObjectMapping | Defines the list of constructor arguments of a given component. These arguments must be ObjectMappings. |
| extends              | rdfs:subClassOf         | oo:Component     → oo:Component                 | Say that a certain component extends from another component, which will inherit all its parameters. |
| requireElement       | oo:componentPath        | oo:Component     → xsd:string                   | The object path to a module delimited by `.`. For example, the path to element `X` in object `{ a: { b: { X: { ... } } } }` is `a.b.X`. |

## Example: Abstract Component

`MyModule/MyAbstractComponent` is a component that can not be instantiated directly.
It has a set of parameter that are inherited on extensions.
The constructor arguments are not automatically inherited, but these can be extended.

```json
{
  ...
  "@id": "MyModule/MyAbstractComponent",
  "@type": "AbstractClass",
  "requireElement": "path.to.MyAbstractComponent",
  "comment": "This is an abstract component that is not instantiatable.",
  "parameters": [
    { ... }
  ],
  "constructorArguments": [
    "@id": "MyModule/MyAbstractComponent#constructorArguments",
    ...
  ]
}
```

## Example: Component Extension

`MyModule/MyComponent` is a component that extends the abstract component `MyModule/MyAbstractComponent`.
It inherits the parameters of its parent, and can potentially also add new ones specific to this subcomponent.
In this case, it extends the constructor arguments of its parent, and can potentially add new object mappings.

```json
{
  ...
  "@id": "MyModule/MyComponent",
  "@type": "Class",
  "extends": "MyModule/MyAbstractComponent",
  "requireElement": "path.to.MyComponent",
  "comment": "This is an instantiatable component.",
  "parameters": [
    { ... }
  ],
  "constructorArguments": [
    "extends": "MyModule/MyAbstractComponent#constructorArguments"
    ...
  ]
}
```

## Example: Component Instance

`MyModule/MyComponentInstance` is a component that already is an instance.
This can not be instantiated further, but it can be used by other component configurations as argument.

```json
{
  ...
  "@id": "MyModule/MyComponentInstance",
  "@type": "Instance",
  "requireElement": "path.to.MyInstance",
  "comment": "This component is an instance."
}
```
