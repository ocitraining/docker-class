
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

