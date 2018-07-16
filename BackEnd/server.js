var express = require("express");
var cluster = require('cluster');
var bodyParser = require("body-parser");

const crypto = require('crypto');
const fs = require("fs");

const https = require("https");

var app = express();

const logConfig = require('./config/log-conf');
const logger = require('js-logging').dailyFile([logConfig.getLogSettings()]);

var lookBot = require('./bots/lookBot.js');
var eventsBot = require('./bots/eventsBot.js');
var startServer = require('./utils/startingServer.js');
const config = require('./config/config');

startServer.firstUser();

lookBot.lookBot();
eventsBot.loadEvents();

var server;

//SSL Security
//var privatekeyDir = "./ssl/privatekey.pem";
//var certificateDir = "./ssl/certificate.pem";
var privatekeyDir = './ssl/private_key.key';
var certificateDir = './ssl/ssl_certificate.cer';
if (config.activateSSL && fs.existsSync(privatekeyDir) && fs.existsSync(certificateDir)) {
    var SSL = {
        key: fs.readFileSync(privatekeyDir),
        cert: fs.readFileSync(certificateDir)
        //key: fs.readFileSync(privatekeyDir),
        //cert: fs.readFileSync(certificateDir),
    };
    server = https.createServer(SSL, app);
}else{
    server = require('http').Server(app);
}
//server = require('http').Server(app);

// Aceptaremos JSON y valores codificados en la propia URL
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({limit: '4mb',extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Todos los endpoint del API los colocaremos en este fichero
var routes = require("./routes/routes.js")(app);

server.listen(3000, function() {
    console.log("Servidor escuchando peticiones en el puerto %s...", server.address().port);
    logger.info("Servidor escuchando peticiones en el puerto %s...", server.address().port);
});




module.exports = app;