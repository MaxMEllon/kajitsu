.PHONY: build
build:
	yarn workspace @kajitsu/ichigo run build
	yarn
	yarn workspace @kajitsu/suica run build
	yarn
	yarn workspace @kajitsu/melon run build
