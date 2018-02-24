install:
	npm install

build: install
	npm run build
	cp index.html build/index.html

setup: build
	npm install
	npm run build

run:
	npm run serve