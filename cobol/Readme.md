
# Building a COBOL service

This lab walks through creating a COBOL command, then attaching that
command to a ReST API.

## Develop the service

The service consists of two parts: a COBOL command and a ReST API
handler.  The API is implemented using node.js.

Here we create the COBOL command, test it, create the API handler and
test it, then tie them together in a Docker container and execute the
container to make the command available via the API.

### Create COBOL command

Edit the file HELLO.COB:
```cobol
000100* HELLO.COB GNU Cobol FAQ example
000200 IDENTIFICATION DIVISION.
000300 PROGRAM-ID. hello.
000400 PROCEDURE DIVISION.
000500     DISPLAY "Hello, TARGET!".
000600     STOP RUN.
```

replace the string TARGET in the DISPLAY message with something
recognizable.  "World" will work if you want.

### Compile the COBOL command

```bash
    docker run -it --rm -v $(pwd):/source nacyot/cobol-open:apt cobc -x /source/HELLO.COB
```

This mounts the current directory as the directory _/source_ in the
container and runs the COBOL compiler on the source file to create an
executable image.

### Test the COBOL command

```bash
    docker run -it --rm -v $(pwd):/source nacyot/cobol-open:apt /source/HELLO
```

This mounts the current directory as the directory _/source_ in the
container and executes the compile command.  This needs to be done using
the container so that the COBOL libraries are available at run time.

### Create the API handler

This is done using the `restify` _node.js_ module to provide route handling
for the service.

The file _service.js_:
```javascript
var restify = require('restify');
var exec    = require('child_process').execFile;

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

function doCobol(req, res, next) {
  exec('/app/HELLO', function(error, stdout, stderr) {
    res.send('COBOL sez: ' + stdout);
    next();
  });
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.head('/hello/:name', respond);

server.get('/cobol', doCobol);
server.head('/cobol', doCobol);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
```

has the server implementation with port assignments and routes defined in it.

The route to _/hello/:name:_ are included for testing.

The route to _/cobol_ is the one that will cause the COBOL command to
be executed and the results returned to the caller.

The file _package.json_:
```json
{
  "name": "cobol-api",
  "version": "0.0.1",
  "description": "test API for a COBOL command",
  "main": "server.js",
  "dependencies": {
    "child_process": "^1.0.2",
    "restify": "^4.3.0"
  },
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "keywords": [],
  "author": "Mike Martinez <brillozon@gmail.com> (http://brillozon.com/)",
  "license": "ISC"
}
```

contains the API dependencies and is used to install required software
for use by the API.  Use the `npm` command to install these dependencies.

```bash
    npm install --production
```

### Test the API handler

In one window, start the API service:

```bash
    node service.js
```

In another window, send GET requests to one of the routes:

```bash
    curl -is http://localhost:8080/hello/world
    curl -is http://localhost:8080/hello/internet
```

## Build the service image

The Dockerfile:
```dockerfile
FROM debian:jessie

RUN \
     export DEBIAN_FRONTEND=noninteractive \
  && apt-get update \
  && apt-get -y install \
                build-essential \
                ca-certificates \
                curl \
                locales git \
                nodejs \
                nodejs-legacy \
                npm \
                open-cobol \
                python \
                wget \
  && /usr/sbin/update-locale LANG=C.UTF-8 \
  && locale-gen C.UTF-8 \
  && apt-get remove -y locales \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
ENV LANG C.UTF-8

WORKDIR /app
ADD package.json /app/
RUN npm install --production
ADD . /app

CMD []
ENTRYPOINT ["/usr/bin/npm","start"]
```

is used to create an image that can execute the API service, which will
call the COBOL command for a specific route.

This image is based on the _Debian_ distribution _jessie_ release.  The
next layer includes installation of the cobol compiler and runtime as
well as the node.js server and additional tools.

Subsequent layers copy the _package.json_ file into the image and use it
to install node.js packages as well as establish the execution mechanism.

```bash
    docker build -t cobol-api .
```

## Expose the service via an API

```bash
    docker run -d -p 8080:8080 --name cobol-service cobol-api
```

This executes the image as a daemon and forwards the container port 8080
to the host port 8080, so that the API is available at _localhost:8080_.

You can test the API using POSTMAN from your browser or `curl` from the command line.

```bash
bash> curl -is http://localhost:8080/hello/world;echo
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 13
Date: Mon, 12 Jun 2017 01:44:06 GMT
Connection: keep-alive

"hello world"
bash> curl -is http://localhost:8080/hello/internet;echo
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 16
Date: Mon, 12 Jun 2017 01:44:15 GMT
Connection: keep-alive

"hello internet"
bash> curl -is http://localhost:8080/cobol;echo
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 31
Date: Mon, 12 Jun 2017 01:45:39 GMT
Connection: keep-alive

"COBOL sez: Hello, INTERNET!\n"
bash> 
```


