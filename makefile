src-files = $(shell find src -name *.js)
lib-files = $(patsubst src/%.js, lib/%.js, $(src-files))

all: $(lib-files)

lib/%.js: src/%.js
	mkdir -p $(@D)
	node_modules/.bin/flow-remove-types -o $@ $<

clean:
	rm -rf lib

.PHONY: clean
