## Introduction

The examples in this documentation always use JSON for defining module, component and config files.
Components.js internally works with [RDF](https://www.w3.org/RDF/) data,
which means that any kind of RDF serialization can be used.

!!! note
    Behind the scenes, the JSON files are in fact [JSON-LD](https://json-ld.org/) files containing RDF.

We encourage JSON(-LD) to be used for readability, as the JSON-LD context allows for shortcuts to be defined.

The RDF serializations that are currently supported are all those supported by [`rdf-parse`](https://github.com/rubensworks/rdf-parse.js).

More information on configurations can be found [here](../../configuration/general/).

## Vocabularies

If other serializations are used, the following vocabularies may be required:

* https://linkedsoftwaredependencies.org/vocabularies/object-oriented#.
* https://linkedsoftwaredependencies.org/vocabularies/object-mapping#.
* http://usefulinc.com/ns/doap#.

## Example: Turtle

For example, this is a simple component definition in Turtle:
```
@prefix oo: <https://linkedsoftwaredependencies.org/vocabularies/object-oriented#>.
@prefix om: <https://linkedsoftwaredependencies.org/vocabularies/object-mapping#>.
@prefix doap: <http://usefulinc.com/ns/doap#>.

<http://example.org/MyModule> a oo:Module;
  doap:name "my-module";
  oo:component <http://example.org/MyModule/MyComponent>.

<http://example.org/MyModule/MyComponent> a oo:Class;
  oo:componentPath "MyComponent";
  oo:parameter <http://example.org/MyModule/MyComponent#name>;
  oo:constructorArguments ( <http://example.org/MyModule/MyComponent#name> ).
```

This can be declaratively instantiated as follows:
```
<http://example.org/myInstance> a <http://example.org/MyModule/MyComponent>;
  <http://example.org/MyModule/MyComponent#name> "John".
```

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/getting_started/basics/config_serializations)
