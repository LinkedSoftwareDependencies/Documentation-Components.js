Runtime dependency injection based on config files comes with a natural performance overhead.
In some cases, this overhead may not be desired, and can be avoided by _pre-compiling_ config files.
This is useful in cases where the same config file must be instantiated multiple times in a time-sensitive environment.

# Command line compilation

The easiest way to compile a config file is by invoking the `componentsjs-compile-config` binary on a config as follows:

```bash
yarn run componentsjs-compile-config http://example.org/myInstance -c config.jsonld > main.js
```

This will create a `main.js` file that contains the instantiation of `http://example.org/myInstance` inside a `config.jsonld` file.
All Components.js steps are done during compilation,
which means that Components.js is not required anymore for running the resulting JavaScript file.
This will also make running slightly faster.

[_Example Source_](https://github.com/LinkedSoftwareDependencies/Examples-Components.js/tree/master/documentation/loading/instantiation)

!!! note
    This binary accepts additional parameters for configuring things like the main module path and the object that should be exported.
    These parameters and their usage can be found by calling `yarn run componentsjs-compile-config --help`.

!!! note
    If your application makes use of config variables, it is recommended to enable the `-f` flag to expose your instance as a function that accepts a hash of variables.

# Programmatic compilation

Compilation can also be done via the JavaScript API.
For this, the asynchronous `compileConfig` function can be used as follows:

```javascript
import {compileConfig} from "componentsjs";

...

compileConfig({ mainModulePath, scanGlobal }, configPath, configStreamRaw, configResourceUri, exportVariableName, asFunction)
    .then(console.log)
    .catch(console.error);
```

[Documentation on the available parameters](https://github.com/LinkedSoftwareDependencies/Components.js/blob/master/lib/CompileUtil.ts#L5-L15).
