lint:
	npx prettier --write --single-quote --tab-width=4 --print-width=120 index.js *.{html,css,md}
dev:
	npx serve