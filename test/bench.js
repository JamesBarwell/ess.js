var fs        = require('fs'),
    benchmark = require('benchmark'),
    jsdom     = require('jsdom');

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

        domReady(doc, ess);
    }
);

function domReady(doc, ess) {
    var suite = new benchmark.Suite();

    [
        'div div',
        '#nav li',
        '#nav ul li a .hl span',
        '#nav .fail div li a span',
    ].forEach(function(selector) {
        suite.add(selector, function() {
            ess(selector);
        });
    });

    suite.on('cycle', function(event) {
        console.log(String(event.target));
    })
    suite.on('complete', function() {
        console.log('Benchmark complete');
    })
    //.run()
    .run({ async: true });
}
