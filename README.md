
# Introduction to Microservices

This repository contains the lab materials and instructions for the OCI
Training "Introduction to Microservices" class.  The lab materials
include basic `docker` instructional material.  Docker is used as a
basis for microservices, and an introductory level of instruction is
included in the course for learning the basics of Docker.

#### Installation

Installation of Docker is defined very well at: LINK

#### Lab 1: Hello World

```bash
docker run hello-world
```

#### Lab 2: Container Execution

```bash
docker run --rm swaggerapi/swagger-codegen-cli langs
```

```bash
docker run --rm -it ubuntu:xenial bash
```

#### Lab 3: Storage Volumes

```bash
rm -rf lab3data && mkdir lab3data
docker run -v $(pwd)/lab3data:/path/location ocitraining/dockerclass-lab3 copyto /path/location
```

```bash
docker run --rm -it -v $(pwd)/lab3data:/path/location ocitraining/dockerclass-lab3 bash
```

#### Lab 4: Networking

```bash
docker run -d -p 8080:8080 swaggerapi/swagger-editor
```

```bash
docker run -d -e GENERATOR_HOST=localhost -p 80:8080 swaggerapi/swagger-generator
```

#### Lab 5: Storage Volumes Redux

```bash
rm -rf lab5data && mkdir lab5data
docker run -v $(pwd):/local swaggerapi/swagger-codegen-cli generate -i /local/lab5/swagger.json -l nodejs-server -o /local/lab5data/nodejs
```

```bash
docker run -v $(pwd):/local swaggerapi/swagger-codegen-cli generate -i /local/lab5/swagger.json -l javascript -o /local/lab5data/js
```

```bash
docker run -v $(pwd):/local swaggerapi/swagger-codegen-cli generate -i /local/lab5/swagger.json -l bash -o /local/lab5data/bash
```

#### Lab 6: Storage Volumes and Networking

```bash
docker run -d -v lab6/index.html:/usr/share/nginx/html/index.html:ro -p 8088:80 nginx:stable-alpine
```

```bash
docker run -d -v lab6/html:/usr/share/nginx/html:ro -p 8088:80 nginx:stable-alpine
```

#### Lab 7: Building Docker Images

```bash
cd lab7
docker build -t my-image .
```

#### Lab 8: Building Tiny Docker Images

```bash
cd lab8
docker run --rm -it -v $(pwd):/home/rust/src ekidd/rust-musl-builder cargo build --release
ls -lh target/x86_64-unknown-linux-musl/release/hello-internet
ldd target/x86_64-unknown-linux-musl/release/hello-internet
target/x86_64-unknown-linux-musl/release/hello-internet
```

```bash
docker build -t hello-internet .
```

```bash
docker run -d -p 3000:3000 hello-internet
curl localhost:3000;echo
```

#### Lab 9: 


