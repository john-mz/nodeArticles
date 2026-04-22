// clase molde para guardar los datos de los articulos en la base de datos
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({ // estructura de los documentos que se guardarán en la
    title: String,
    content: String,
    date: { type: Date, default: Date.now }, // date.now fecha actual en que se guar
    image: String
});

module.exports = mongoose.model('Article', ArticleSchema);
// articles --> guarda documentos de este tipo y con estructura dentro de la colecc