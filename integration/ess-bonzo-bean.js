/*!
  * ess.js
  * (c) 2012 James Barwell, http://jamesbarwell.co.uk
  * https://github.com/JamesBarwell/ess.js
  * license MIT
  */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['ess', 'bonzo', 'bean'], factory);
    } else {
        root.$ess = factory(root.ess, root.bonzo, root.bean);
    }
}(this, function (Ess, Bonzo, Bean) {
    function s(selector, context) {
        return wrapBonzo(Ess(selector, context));
    }

    function wrapBonzo(elements) {
        var $elements = Bonzo(elements);

        var proxyMethods = [
            'on',
            'one',
            'off',
            'clone',
            'fire'
        ];
        for (var i = 0, l = proxyMethods.length; i < l; i++) {
            $elements[proxyMethods[i]] = function(method) {
                return function() {
                    for (var j = 0, m = this.length; j < m; j++) {
                        var args = Array.prototype.slice.call(arguments);
                        args.unshift(this[j]);
                        Bean[method].apply(Bean, args);
                    }
                    return this;
                }
            }(proxyMethods[i]);
        }

        $elements.find = function(selector) {
            var elements = [];
            for (var i = 0, l = this.length; i < l; i++) {
                elements = elements.concat(Ess(selector, this[i]));
            }
            return wrapBonzo(elements);
        }

        return $elements;
    }

    return s;
}));
