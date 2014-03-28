var fs     = require('fs'),
    assert = require('assert'),
    mocha  = require('mocha'),
    jsdom  = require('jsdom');

describe('ess.js', function() {

    var doc, ess, A, D;

    before(function(done) {
        var html = fs.readFileSync(__dirname + '/tests.html', 'utf8');
        jsdom.env(
            html, [
                __dirname + '/../src/ess.js'
            ],
            function(errors, win) {
                if (errors) {
                    throw errors;
                }
                doc = win.document;
                ess = win.ess;

                // Test helpers
                A = Array.prototype.slice,
                D = doc.getElementsByClassName.bind(doc);

                done();
            }
        );

    });

    describe('selector', function() {

        var tests = {
            // Head/body
            'body':     function() { return [doc.body] },
            'head':     function() { return [doc.head] },

            // Simple
            'p':        function() { return A.call(D('t-01')); },
            '#nav':     function() { return D('t-02')[0]; },
            '.root':    function() { return A.call(D('t-03')); },

            // Double homogenous
            'div div':       function() { return A.call(D('t-04')); },
            '.root .header': function() { return A.call(D('t-05')); },

            // Double heterogenous
            'div .header':   function() { return A.call(D('t-06')); },
            '.root div':     function() { return A.call(D('t-07')); },
            '#nav li':       function() { return A.call(D('t-08')); },
            '#nav .current': function() { return A.call(D('t-09')); },

            // Triple+
            '#nav ul li':            function() { return A.call(D('t-10')); },
            '#nav ul .current':      function() { return A.call(D('t-11')); },
            '#nav ul li a .hl span': function() { return A.call(D('t-12')); },

            // ID within context
            'body #nav':          function() { return D('t-13')[0]; },
            'body #nav .current': function() { return A.call(D('t-14')); },

            // Empty
            '#nav .fail li': function() { return []; }
        }

        Object.keys(tests).forEach(function(selector) {
            it('should match ' + selector, function() {
                var expected = tests[selector]();
                var actual = ess(selector);
                var message = 'Failed match: ' + selector;

                if (Array.isArray(expected)) {
                    assert(
                        Array.isArray(actual),
                        'Failed to return array: ' + selector
                    );
                    for (var i = 0; i < expected.length; i++) {
                        assert.strictEqual(actual[i], expected[i], message);
                    }
                } else {
                    assert(
                        !Array.isArray(actual),
                        'Got array but expected element: ' + selector
                    );
                    assert.strictEqual(actual, expected, message);
                }
            });
        });
    });

});

describe('ess-bonzo-bean.js', function() {

    var doc, $ess, ess, bonzo, bean, A, D;

    before(function(done) {
        var html = fs.readFileSync(__dirname + '/bonzo-bean.html', 'utf8');
        jsdom.env(
            html, [
                __dirname + '/../ess.js',
                __dirname + '/bonzo.js',
                __dirname + '/bean.js',
                __dirname + '/../integration/ess-bonzo-bean.js'
            ],
            function(errors, win) {
                if (errors) {
                    throw errors;
                }
                doc = win.document;
                $ess = win.$ess;
                ess = win.ess;
                bonzo = win.bonzo;
                bean = win.bean;

                // Test helpers
                A = Array.prototype.slice,
                D = doc.getElementsByClassName.bind(doc);

                done();
            }
        );

    });

    describe('selector', function() {

        it('should wrap the response as a Bonzo collection', function() {

                [
                    'body',
                    '#nav ul li'
                ].forEach(function(selector) {
                    var expected = bonzo(ess(selector));
                    var actual = $ess(selector);

                    assert.ok(expected.length > 0);

                    for (var i = 0; i < expected.length; i++) {
                        assert.strictEqual(actual[i], expected[i]);
                    }
                });
        });

        it('should implement the Bean "on" method on to the Bonzo collection', function() {
            var clicked = false;
            $ess('li').on('click', function() {
                clicked = true;
            });

            bean.fire(ess('li')[0], 'click');

            assert.ok(clicked);
        });

        it('should implement a find method on to the Bonzo collection', function() {
            var expected = bonzo(ess('#nav ul li'));
            var actual = $ess('#nav ul').find('li');

            for (var i = 0; i < expected.length; i++) {
                assert.strictEqual(actual[i], expected[i]);
            }
        });

    });

});
