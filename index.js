// conexion a la base de datos

'use strict'

require('dotenv').config();
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('la segunda conexión base de datos se nota');

        // crear servidor y escuchar peticiones http
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:' + port);
        });
    })
    .catch(err => {
        console.error('Error de conexión:', err);
    });