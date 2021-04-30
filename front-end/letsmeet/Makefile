# build-dev:
# 	docker build -t react-client .
build-dev:
	docker build -t react-client .

run-dev: 
	docker run --name react-client -p 3000:3000 \
		-e "API_BASE_URL=http://localhost:4000" \
		--rm react-client

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
		--build-arg BASE_URL=http://159.65.191.151 \
		-f Dockerfile.production .
