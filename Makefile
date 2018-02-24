all: setup

install:
	npm install

build: install
	npm run build
	cp index.html build/index.html

setup: install build

run:
	npm run serve