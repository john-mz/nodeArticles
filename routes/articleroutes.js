'use strict'

var express = require('express'); //importando framework express
var ArticleController = require('../controllers/articlecontroller');

var router = express.Router(); //nos permite separar por rutas cada funcion

var multipart = require("connect-multiparty"); //permite recibir files
var md_upload = multipart({ uploadDir: './upload/articles' }); //permite montar los archivos en dir especifico


// Rutas de prueba
router.get('/probando', ArticleController.probando);
router.post('/probando', ArticleController.probando);
router.get('/test-de-controlador', ArticleController.test);

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put("/article/:id", ArticleController.update);
router.delete("/article/:id", ArticleController.delete);

router.post("/upload-image", md_upload, ArticleController.upload); //sirve
router.post("/upload-image/:id", md_upload, ArticleController.upload); //montar imagen con id especifico. sirve
router.get("/get-image/:image", ArticleController.getImage);  //sirve
router.get("/search/:search", ArticleController.search);  

module.exports = router;