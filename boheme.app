var express = require('express');
var server = express();
server.configure(function(){
  server.use(express.static(__dirname + '/'));
});

server.listen(3000);

