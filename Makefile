setup: install build

install:
	npm install

build: install
	npm run build
	cp index.html build/index.html

run:
	npm start