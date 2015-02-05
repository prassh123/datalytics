var 
    fs = require('fs');

module.exports = {
  apply: function(server) {
      //server.get('/', function(req, res) {
      //res.setHeader('content-type', 'application-json');
      //res.json({msg: 'Keep calm and code on! All is well.'});
      //});
      //

      server.get('/', function indexHTML(req, res, next) {
        fs.readFile(__dirname + '/../../build/index.html', function (err, data) {
          if (err) {
            next(err);
              return;
          }
          res.setHeader('Content-Type', 'text/html');
          res.writeHead(200);
          res.end(data);
          next();
          });
      });



    return server;
  }
};
