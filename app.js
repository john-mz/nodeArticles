// crear aplicacion express
'use strict'

// cargar modulos de node para crear servidor y rutas
var express = require('express');
var bodyParser = require('body-parser'); // recibir peticiones post
//ejecutar express (h)
var app = express();

//middlewares (cors, body-parser, etc.)
app.use(bodyParser.urlencoded({extended:false})); //procesa datos enviados por fc
app.use(bodyParser.json()); //procesa datos enviados por json

var article_routes = require('./routes/articleroutes'); // rutas de articulos

//añadir prefijos a rutas /api
app.use('/api', article_routes); // cargar rutas de articulos con prefijo /api

//rutas paara probar que funciona el backend

//exportar modulo (fichero actual)

module.exports = app; // permitir ussar el objeto app