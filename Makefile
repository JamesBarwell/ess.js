build:
	node_modules/.bin/smoosh make build.json

test:
	node_modules/.bin/mocha test/main.js

spec:
	node_modules/.bin/mocha --reporter spec test/main.js

bench:
	node test/bench.js

.PHONY: test
