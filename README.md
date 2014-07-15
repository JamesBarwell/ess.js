ess.js
======

A fast, simple, opinionated selector "engine".

[![Build Status](https://travis-ci.org/JamesBarwell/ess.js.svg?branch=master)](https://travis-ci.org/JamesBarwell/ess.js)

This module provides a simple way to query the DOM for elements by ID, class or tag name only. It was designed to be both small and to force users to make efficient DOM queries. This is useful when developing for mobile devices and to prevent JavaScript being coupled too heavily to the DOM hierarchy. It intentionally does not and will never support more complicated ways of querying on the basis that these are slow and can be avoided through the use of extra classes (also, there are many other projects around which fulfil this job very well already). This module is AMD compatible.

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

## Ess-Bonzo-Bean
Ess is well complemented by the [Bonzo](https://github.com/ded/bonzo) and [Bean](https://github.com/fat/bean) modules, which together provide a decent jQuery-like DOM manipulation set up. This project includes an integration of the three modules. When using the integrated version of Ess, your queries will return Bonzo objects with chainable Bean methods available on top, and a find() method to drill-down a DOM query. You can also pass an element and get a Bonzo wrapped object back.

## Compatibility
Chrome, Firefox, IE8+, Safari, Android

## Contributing
Contributions are welcome, though the core module has a very limited scope and I do not intend for it to become too large. To make a change, edit the files in the src directory. You can then run build, tests and benchmark using the Makefile. Please commit built files with your changes.

## Credits
Thanks to...
* [umdjs](https://github.com/umdjs/umd) for the AMD bootstrap
* [benchmark.js](https://github.com/bestiejs/benchmark.js) for benchmarking
