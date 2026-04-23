// crear aplicacion express
'use strict'

// cargar modulos de node para crear servidor y rutas
var express = require('express'); //importa el framework express. express permite crear servers web, manejo de rutas http y middlewares sin tener que escribir codigo de bajo nivel
var bodyParser = require('body-parser'); // importa middleware para procesar los datos del body (text/json) para que node los entienda facilmente (los convierte en js objects)

var app = express(); //inicializamos express

//middlewares (cors, body-parser, etc.). son importantes porque express basico no puede leer el body de la peticion (ni json, ni data capturada de forms, ni archivos)
app.use(bodyParser.urlencoded({extended:false})); //procesa datos enviados por fc i.e usando form-urlencoded
app.use(bodyParser.json()); //convierte dato que llegue tipo json texto en objeto de js accesible con req.body

var article_routes = require('./routes/articleroutes'); // rutas de articulos

app.use('/api', article_routes); // cargar rutas de articulos con prefijo /api

module.exports = app; // permitir ussar el objeto app