SRC=route66.js
MIN=route66.min.js
OPTS=-c -m --mangle-props regex='/^_/'

build:
	uglifyjs $(SRC) $(OPTS) > $(MIN)
