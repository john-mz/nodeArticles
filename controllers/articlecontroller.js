'use strict'

var validator = require("validator"); //libreria usada pa validar input de usuario  
var fs = require("fs"); //crud archivos del server
var path = require("path"); //sirve pa trabajar con paths de manera segura entre linux y windows
var Article = require('../models/article'); 

var controller = {

    probando: (req, res) => {
        return res.status(200).send({
            message: "Soy la acción probando de mi controlador de artículos"
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: "Soy la acción test de mi controlador de artículos"
        });
    },

    save: async (req, res) => {
        // Aquí iría la lógica para guardar artículos
        return res.status(200).send({
            message: "Acción de guardado lista"
        });
    },

    getArticles: async (req, res) => {
        var query = Article.find({});

        // Comprobar si llega el parámetro 'last' por la URL
        var last = parseInt(req.query.last || 0, 10);

        if (last > 0) {
            query.limit(last);
        }

        try {
            // Ordenar por ID descendente (los más nuevos primero)
            const articles = await query.sort('-_id');

            if (!articles || articles.length === 0) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artículos para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                articles
            });

        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al devolver los artículos !!!'
            });
        }
    },

    getArticle: async (req, res) => {
        var articleId = req.params.id;

        if (!articleId || articleId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el artículo !!!'
            });
        }

        try {
            const article = await Article.findById(articleId);

            if (!article) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el artículo !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                article
            });

        } catch (err) {
            return res.status(500).send({
                status: 'error',
                message: 'Error al devolver el artículo !!!'
            });
        }
    },
    update: async (req, res) => {
        var articleId = req.params.id;
        var params = req.body;

        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({   
                status: 'error',
                message: 'Faltan datos por enviar!'
            })
        }

        if (validate_title && validate_content) {

            try {
                const articleUpdated = await Article.findOneAndUpdate(
                    { _id: articleId },
                    params,
                    { returnDocument: 'after' }
                );

                if (!articleUpdated) {
                    return res.status(404).send({
                        status: "error",
                        message: "No existe el articulo!"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    article: articleUpdated
                });

            } catch (err) {
                return res.status(500).send({
                    status: 'error',
                    message: "Error al actualizar!"
                })
            }

        } else {
            return res.status(200).send({
                status: "error",
                message: "la validacion no es correcta!"
            })
        }
    },
    delete: async(req, res) => {
        var articleId = req.params.id;
        try {
            const articleRemoved = await Article.findOneAndDelete({_id: articleId})

            if (!articleRemoved){
                return res.status(404).send({
                    status: "error",
                    message: "No se ha borrado el articulo, posiblemente no exista"
                })
            }

            return res.status(200).send({
                status: "success",
                article: articleRemoved
            });
        }catch(err){
            return res.status(500).send({
                status: "error",
                message: "error al borrar"
            })
        }
    },
    upload: async (req, res) => {
        if (!req.files || !req.files.file0 && !req.files.image) {
            return res.status(404).send({
                status: "error",
                message: "Imagen no subida...",
            });
        }

        var file = req.files.file0 || req.files.image;

        if (Array.isArray(file)) {
            file = file[0]
        }

        if (!file || !file.path) {
            return res.status(400).send({
                status: "error",
                message: "El campo del archivo debe llamarse image o file0 y debe ser de tipo file"
            })
        }

        var file_path = file.path;
        var file_name = path.basename(file_path);
        var file_ext = path.extname(file_name).replace('.', '').toLowerCase();

        if (file_ext != 'png' && file_ext != 'jpg' && file_ext != "jpeg" && file_ext != "gif") {
            fs.unlink(file_path, () => {
                return res.status(200).send({
                    status: "error",
                    message: "La extension de la imagen no es valida !!!"
                });
            })
        } else {
            var articleId = req.params.id ? req.params.id.trim() : null;

            if (articleId) {
                try {
                    const articleUpdated = await Article.findByIdAndUpdate(
                        articleId,
                        { image: file_name },
                        { returnDocument: 'after' }
                    );
                    if (!articleUpdated) {
                        return res.status(404).send({
                            status: "error",
                            message: "no existe el articulo"
                        })
                    }
                    return res.status(200).send({
                        status: "success",
                        article: articleUpdated
                    })
                } catch (err) {
                    return res.status(500).send({
                        status: "error",
                        message: "Error al guardar la imagen de articulo !"
                    })
                }
            } else {
                return res.status(200).send({
                    status: "success",
                    message: "Imagen subida pero no asociada a ningun articulo porque no enviaste el id",
                    image: file_name
                })
            }
        }
    },
    getImage: (req, res) => {
        var file = path.basename(req.params.image.trim());
        var pathFile = path.resolve(__dirname, '../upload/articles', file);

        //fs.access verifica que el archivo exista. F_OK nos indica si se puede leer el file
        fs.access(pathFile, fs.constants.F_OK, (err) => {
            if (err) {
                return res.status(404).send({
                    status: "error",
                    message: "La imagen no existe"
                })
            }
            return res.sendFile(pathFile);
        })
    },
    // buscar por titulo o contenido
    search: async (req, res) => {
        var searchString = req.params.search;
        try {
            const articles = await Article.find({
                "$or": [
                    { "title": { "$regex": searchString, "$options": "i" } },
                    { "content": { "$regex": searchString, "$options": "i" } }
                ]
            })
                .sort([['date', 'descending']]);

            if (!articles || articles.length <= 0) {
                return res.status(404).send({
                    status: "error",
                    message: "No hay articulos que coincidan con tu busqueda"
                })
            }

            return res.status(200).send({
                status: "success",
                articles
            });
        }
        catch (err) {
            return res.status(500).send({
                status: "error",
                message: "error en la peticion"
            })
        }
    }
};

module.exports = controller;