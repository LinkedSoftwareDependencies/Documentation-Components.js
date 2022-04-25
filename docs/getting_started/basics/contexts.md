# Context lookup

As can be seen in other sections, configuration files usually use one or more contexts (`@context`_. [_Context_](https://www.w3.org/TR/json-ld11/#the-context) itself is a concept in JSON-LD.

Despite that contexts refer to remote files via URLs, Components.js does not always perform HTTP requests to fetch them, for performance reasons. Instead, Components.js will first attempt to perform _local context lookup_, and will fall back to retrieve the context from the URL if local context lookup fails.

For local context lookup, Components.js will check inside all modules under the `node_modules/` directory to see if they contain the relevant context file; it will also try to find the context file from the _current_ module/project.

Thanks to local context lookup, you do not need to publish your module to use Components.js. It also makes the context lookup faster.



See [context overriding](./exposing_components.md) for more advanced mechanisms to specify contexts.


