A component configuration describes an _instantiation_ of a component.

There are two options for instantiating components:

1. The instantiation is done based on a _semantic_ component, i.e., a component that is a semantic [`oo:Component`](../components/general/).
2. The instantiation is done based on an _non-semantic_ component, i.e., a raw reference to a JavaScript class, without semantic declarations.

The [first option](./semantic/) is the suggested way for working with Components.js,
as it allows a more semantic representation of the instantiation and is less verbose than the alternative.
But in some cases, it may not be possible for a component to be semantically described easily.
For example, you may want to inject a piece of code from an external library that does not provide a Components.js component definition.
In those cases, it is more convenient to call the constructor of that component [directly](./nonsemantic/).
