var express = require("express");
var bodyParser = require("body-parser");
var app = express();

//Libreria de threads
var cluster = require('cluster');

var server = require('http').Server(app);

// Aceptaremos JSON y valores codificados en la propia URL
app.use(bodyParser.json({limit: '4mb'}));
app.use(bodyParser.urlencoded({limit: '4mb',extended: true}));

// Todos los endpoint del API los colocaremos en este fichero
var routes = require("./routes/routes.js")(app);

server.listen(3000, function() {
    console.log("Servidor escuchando peticiones en el puerto %s...", server.address().port);
});

module.exports = app;