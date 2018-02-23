
install:
	npm install

build: install
	npm build
	cp index.html build/index.html

setup: build
	npm install
	npm build

run:
	npm run serve