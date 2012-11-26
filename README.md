ess.js
======

A fast, simple, opinionated selector "engine".

This module provides a simple way to query the DOM for elements by ID, class or tag name only. It is designed to be small and to only allow efficient DOM queries, which is especially useful with mobile devices. It intentionally does not and will never support more complicated ways of querying on the basis that these are slow and can be avoided. This module is AMD compatible.

This module should not be compared to sophisticated selector engines like Sizzle, Qwery, etc., which are capable of much more. It is probably not suitable as a drop-in replacement for many projects.

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

## Stuff that it cannot do
* Qualified selectors like: ```li.current```
* Non-simplistic patterns like: ```div > ul``` or  ```p + p```
* Comma-separated selectors like: ```input, select, textarea```
* Anything else other than atomistic, space-separated selection by ID, class and tag!

## Compatibility
Chrome, Firefox - proper testing to follow. Currently it assumes basic ES5 support but that will probably be removed in the future.

## Todo
* Browser compatibility (remove ES5 dependency)
* Look at adding simple qualified selector support
* Bonzo version
* Ender integration
* Improve readme
* Licence it
