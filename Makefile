### Dev is the environment we use while we develop our application: http://localhost:3000
build-dev:
	cd front-end/letsmeet && $(MAKE) build-dev
	cd back-end/letsmeet && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

### Local is the environment (identical to the production environment) we test our application in before deploying to production: http://localhost:80 or http://localhost
build-local:
	cd front-end/letsmeet && $(MAKE) build-local
	cd back-end/letsmeet && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up

### Production is the environment of the application we deployed: http://159.65.191.151/
build-production:
	cd front-end/letsmeet && $(MAKE) build-production
	cd back-end/letsmeet && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

SSH_STRING:=root@159.65.191.151

ssh:
	ssh $(SSH_STRING)

### copy all files to the hosting server
copy-files:
	scp -r ./* $(SSH_STRING):/root/
