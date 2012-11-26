define(
    ['../src/ess'],
    function(s) {
        window.ess = s;

        // Test helpers
        var A = Array.prototype.slice,
            D = document.getElementsByClassName.bind(document);

        var tests = {
            // Head/body
            'body':     function() { return [document.body] },
            'head':     function() { return [document.head] },

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

            // Empty
            '#nav .fail li': function() { return []; }
        }

        var allPassed = true;

        // Unit test
        console.log('Begin tests');
        Object.keys(tests).forEach(function(selector) {
            var expected = tests[selector](),
                actual = s(selector),
                passed = true;

            if (expected.length !== actual.length) {
                passed = allPassed = false;
            }

            for (var i = 0; i < expected.length; i++) {
                if (expected[i] !== actual[i]) {
                    passed = allPassed = false;
                }
            }

            var result = passed ? 'passed' : 'failed';
            console.log('Testing selector: [' + selector + '] - ' + result);
        });

        if (allPassed) {
            var count = Object.keys(tests).length;
            console.log('All ' + count + ' tests passed');
        } else {
            console.log('Some tests failed');
        }

        // Benchmark
        console.log('Begin benchmark');
        var suite = new Benchmark.Suite;
        var benchTests = [
            'div div',
            '#nav li',
            '#nav ul li a .hl span',
            '#nav .fail div li a span',
        ].forEach(function(selector) {
            suite.add(selector, function() {
                s(selector);
            })
        });
        suite.on('cycle', function(event) {
            console.log(String(event.target));
        })
        .on('complete', function() {
            console.log('Benchmark complete');
        })
        .run({ async: true });
    }
);
