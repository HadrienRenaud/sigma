setup: install build

install:
	npm install

build: install
	npm run build
	cp index.html build/index.html
	npm run doc

doc:
	npm run doc

run:
	npm start