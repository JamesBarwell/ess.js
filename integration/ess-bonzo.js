/*!
  * ess.js
  * (c) 2012 James Barwell, http://jamesbarwell.co.uk
  * https://github.com/JamesBarwell/ess.js
  * license MIT
  */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ess', 'bonzo'], factory);
    } else {
        root.ess = factory(root.ess, root.bonzo);
    }
}(this, function (Ess, Bonzo) {
    function s(selector, context) {
        return Bonzo(Ess(selector, context));
    }
    return s;
}));
