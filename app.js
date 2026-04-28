// crear aplicacion express
'use strict'

// cargar modulos de node para crear servidor y rutas
var express = require('express'); //importa el framework express. express permite crear servers web, manejo de rutas http y middlewares sin tener que escribir codigo de bajo nivel
var bodyParser = require('body-parser'); // importa middleware para procesar los datos del body (text/json) para que node los entienda facilmente (los convierte en js objects)

var app = express(); //inicializamos express

//middlewares (cors, body-parser, etc.). son importantes porque express basico no puede leer el body de la peticion (ni json, ni data capturada de forms, ni archivos)
app.use(bodyParser.urlencoded({extended:false})); //Si la petición entrante trae el formato de un formulario web tradicional (x-www-form-urlencoded), captúrala, desármala y conviértela en un objeto de JavaScript"
app.use(bodyParser.json()); //Si la petición entrante trae el formato de un JSON puro (application/json), captúrala, procésala y conviértela en un objeto de JavaScript

var article_routes = require('./routes/articleroutes'); // rutas de articulos

app.use('/api', article_routes); // cargar rutas de articulos con prefijo /api

module.exports = app; // permitir ussar el objeto app