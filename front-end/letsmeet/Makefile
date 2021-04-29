build-dev:
	docker build -t react-client .

build-local:
	docker build \
		-t react-client-production:local \
		--build-arg CADDYFILE=Caddyfile.local \
		--build-arg BASE_URL=http://localhost:4000/api \
		-f Dockerfile.production .

build-production:
	docker build \
		-t react-client-production:production \
		--build-arg CADDYFILE=Caddyfile.production \
		--build-arg BASE_URL=https://letsmeet.com/api \
		-f Dockerfile.production .
