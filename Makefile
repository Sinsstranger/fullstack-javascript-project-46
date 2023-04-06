publish:
	npm publish --dry-run
lint:
	npx eslint
install:
	npm ci
link: 
	sudo npm link
test:
	npx jest
test-coverage:
	npx jest --coverage