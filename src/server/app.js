var
    bunyan  = require('bunyan'),
    restify = require('restify'),
    routes  = require('./routes');

var configFile = process.env.DLY_CONFIGFILE || 'development.json';

try {
    var config  = require('../config/' + configFile);
} catch (e) {
    console.log(e);
    process.exit(1);
}

var log = bunyan.createLogger({name: config.app.name});
log.info(config);

process.on('SIGINT', function () {
    log.info('Caught shutdown event');
    process.exit(0);
});

var server = restify.createServer({
    version: config.app.version
});


server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
routes.apply(server);

// serve static JavaScript and CSS.
server.get(/\/|js|css|images\/?.*/, restify.serveStatic({
    directory: __dirname + '/../../build'
}));

server.listen(config.server.port, function() {
    log.info('%s listening at %s', server.name, server.url);
});

module.exports = server;
