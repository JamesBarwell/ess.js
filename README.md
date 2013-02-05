ess.js
======

A fast, simple, opinionated selector "engine".

This module provides a simple way to query the DOM for elements by ID, class or tag name only. It was designed to be both small and to force users to make efficient DOM queries, which is useful when developing for mobile devices. It intentionally does not and will never support more complicated ways of querying on the basis that these are slow and can be avoided (also, there are many other projects around which fulfil this job very well already). This module is AMD compatible.

## Examples
```js
// Queries by ID, class or tag name
ess('#nav'); // returns DOMNode
ess('.current'); //returns DOMNode array
ess('li'); //returns DOMNode array

// Space-separated, drill-down queries
ess('#nav .current'); // returns DOMNode array
ess('#nav li'); // returns DOMNode array

// Specifying a DOM context to perform the query
var navElement = ess('#nav');
ess('li', navElement); // returns DOMNode array
```

## Queries that it cannot do
* Qualified selectors: ```li.current``` (maybe soon)
* Non-simplistic selectors: ```div > ul``` or  ```p + p```
* Comma-separated selectors: ```input, select, textarea```
* Anything else other than atomistic, space-separated selection by ID, class and tag!

# Other caveats
* Searching for an element by ID will ignore any given context, e.g. ```body #nav``` is equivalent to ```#nav```

## Compatibility
Chrome, Firefox - proper list of devices to follow.

## Todo
* Look at adding simple qualified selector support
* Bonzo version
* Ender integration

## Credits
Thanks to...
* [umdjs](https://github.com/umdjs/umd) for the AMD bootstrap
* [benchmark.js](https://github.com/bestiejs/benchmark.js) for benchmarking
