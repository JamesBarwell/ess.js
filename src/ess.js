(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.ess = factory();
    }
}(this, function () {
    function s(selector, context) {
        var elements = [];
        if (selector.indexOf(' ') !== -1) {
            var parts = selector.split(' '),
                thisSelector = parts.shift(),
                nextSelector = parts.join(' '),
                results = s(thisSelector, context);
            if (results) {
                if (typeof results.length !== 'undefined') {
                    for (var i=0, l=results.length; i < l; i++) {
                        elements = elements.concat(s(nextSelector, results[i]));
                    }
                } else {
                    elements = elements.concat(s(nextSelector, results));
                }
            }
        } else {
            context = context || document;
            var type = selector.substring(0, 1);
            if ('#' === type) {
                return context.getElementById(selector.substring(1));
            } else {
                var list;
                if ('.' === type) {
                    list = context.getElementsByClassName(selector.substring(1));
                } else {
                    list = context.getElementsByTagName(selector);
                }
                var listLength = list.length;
                for (var i = 0; i < listLength; i++) {
                    elements.push(list[i]);
                }
            }
        }
        return elements;
    }
    return s;
}));
