build-dev:
	docker build -t react-client .

build-local:
	docker build \
		-t react-client-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:4000 \
		-f Dockerfile.production .

build-production:
	docker build \
		-t react-client-production:production \
		--build-arg CADDYFILE=Caddyfile.production \
<<<<<<< HEAD
		--build-arg BASE_URL=https://159.65.191.151 \
=======
		--build-arg BASE_URL=http://159.65.191.151 \
>>>>>>> 24d910632228629b23f1e4e005588b98b3ffca89
		-f Dockerfile.production .
