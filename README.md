ess.js
======

A fast, simple, opinionated selector "engine".

This module provides a simple way to query the DOM for elements by ID, class or tag name. It is designed to be small and to only allow efficient DOM queries, which is especially useful with mobile devices. It intentionally does not and will never support more complicated ways of querying, such as can be achieved with jQuery or qwery, on the basis that good HTML and JavaScript design should avoid this need.

## Compatibility
Chrome, Firefox - proper testing to follow. Currently it assumes basic ES5 support but that will probably be removed in the future.

## Examples
```js
// Simple queries by ID, class or tag name
ess('#nav'); // returns DOMNode
ess('.current'); //returns DOMNode array
ess('li'); //returns DOMNode array

// Drill-down queries
ess('#nav .current'); // returns DOMNode array
ess('#nav li'); // returns DOMNode array

// Specifying a DOM context to perform the query
var navElement = ess('#nav');
ess('li', navElement); // returns DOMNode array
```

## Todo
* Browser compatibility test (remove es5 dependency)
* Bonzo version
* Ender integration
* Improve readme
