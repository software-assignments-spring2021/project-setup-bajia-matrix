### Dev is the environment we use while we develop our application
build-dev:
	cd front-end/letsmeet && $(MAKE) build-dev
	cd back-end/letsmeet && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

### Local is a copy of what the environment looks like in production, but without deploying it
build-local:
	cd front-end/letsmeet && $(MAKE) build-local
	cd back-end/letsmeet && $(MAKE) build

run-local
	ENV=local docker-compose -f docker-compose-production.yml up

### Production is the environment of the app we want to use when deploying
build-production:
	cd front-end/letsmeet && $(MAKE) build-production
	cd back-end/letsmeet && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up