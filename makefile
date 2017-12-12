src-files = $(shell find src -name *.js)
lib-files = $(patsubst src/%.js, lib/%.js, $(src-files))

test-files = $(shell find test -name *.js)

all: $(lib-files)

lib/%.js: src/%.js
	mkdir -p $(@D)
	node_modules/.bin/flow-remove-types -o $@ $<

clean:
	rm -rf lib

mocha-opts = --require dotenv/config --ui exports

test: flow mocha flow-coverage

mocha: $(lib-files) $(test-files)
	node_modules/.bin/nyc --all -- node_modules/.bin/mocha $(mocha-opts) test/**/*.js

flow: $(src-files)
	node_modules/.bin/flow check

flow-coverage:
	node_modules/.bin/flow-coverage-report -i 'src/**/*.js' -f node_modules/.bin/flow

.PHONY: clean test flow
