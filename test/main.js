var fs     = require('fs'),
    assert = require('assert'),
    mocha  = require('mocha'),
    jsdom  = require('jsdom'),
    sinon  = require('sinon');

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

    describe('DOM selector', function() {
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
            context('having selected on: ' + selector, function() {
                var actual, expected;

                beforeEach(function() {
                    actual      = ess(selector);
                    expected    = tests[selector]();
                });

                it('should return the correct data type', function() {
                    if (Array.isArray(expected)) {
                        assert(Array.isArray(actual),
                            'Failed to return array: ' + selector
                        );
                    } else {
                        assert(
                            !Array.isArray(actual),
                            'Got array but expected element: ' + selector
                        );
                    }
                });

                it('should return the matching element(s)', function() {
                    var failMessage = 'Failed match: ' + selector;

                    if (Array.isArray(expected)) {
                        for (var i = 0; i < expected.length; i++) {
                            assert.strictEqual(actual[i], expected[i], failMessage);
                        }
                    } else {
                        assert.strictEqual(actual, expected, failMessage);
                    }
                });
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

    describe('DOM selector', function() {

        context('having made a selection', function() {
            var actual, expected;

            beforeEach(function() {
                var selector = '#nav ul li'
                actual = $ess(selector);
                expected = bonzo(ess(selector));
            });

            it('should wrap the response as a Bonzo collection', function() {
                assert.ok(expected.length > 0);

                for (var i = 0; i < expected.length; i++) {
                    assert.strictEqual(actual[i], expected[i]);
                }
            });

        });

        context('having made a selection and used Bean to bind and fire a click event', function() {
            var actual, expected, spy;

            beforeEach(function() {
                var selector = '#nav ul li'
                actual = $ess(selector);
                expected = bonzo(ess(selector));

                spy = sinon.spy();
                $ess('li').on('click', spy);
                bean.fire(ess('li')[0], 'click');
            });

            it('should have run the bound callback', function() {
                sinon.assert.calledOnce(spy);
            });
        });

        context('having made a selection and used .find() to search within its context', function() {
            var actual, expected;

            beforeEach(function() {
                actual = $ess('#nav ul').find('li');
                expected = bonzo(ess('#nav ul li'));
            });

            it('should return the matching elements', function() {
                for (var i = 0; i < expected.length; i++) {
                    assert.strictEqual(actual[i], expected[i]);
                }
            });
        });

    });

});
