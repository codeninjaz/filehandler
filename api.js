var Restify = require('restify');
var Data = require('./test/filedata.json');

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function respond(req, res, next) {
  //Simulate delay
  //sleep(8000);
  res.cache('no-cache');
  res.send(Data);
  next();
}

var server = Restify.createServer();
//Cross origin
server.use(
  function crossOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

server.get('/filedata', respond);
//server.head('/filedata', respond);

server.listen(8099, function() {
  console.log('%s listening at %s', server.name, server.url);
});
