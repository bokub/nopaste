lint:
	npx prettier@2.0.5 --write --single-quote --tab-width=4 --print-width=120 *.{js,html,css,md}
dev:
	npx serve -s