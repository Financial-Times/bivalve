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

test: flow $(lib-files) $(test-files)
	node_modules/.bin/nyc --all -- mocha $(mocha-opts) $(test-files)

flow: $(src-files)
	node_modules/.bin/flow check

.PHONY: clean test flow
