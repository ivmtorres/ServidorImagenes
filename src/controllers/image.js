var fs = require("fs"),
  path = require("path"),
  md5 = require("md5"),
  sidebar = require("../helpers/sidebar"),
  Models = require("../models");

module.exports = {
  index: function(req, res) {
    var viewModel = {
      image: {},
      comments: []
    };
    //generamos flag de estado en consola para indicacion
    console.log("este es el nombre del archivo");
    console.log(req.params.image_id);
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function(err, image) {
        if (err) {
          throw err;
        }
        if (image) {
          console.log("incrementa el contador");
          console.log(image);
          image.views = image.views + 1;
          viewModel.image = image;
          image.save();
          Models.Comment.find(
            { image_id: image._id },
            {},
            { sort: { timestamp: 1 } },
            function(err, comments) {
              viewModel.comments = comments;
              console.log(comments);
              sidebar(viewModel, function(viewModel) {
                console.log(viewModel);
                res.render("image", viewModel);
              });
            }
          );
        } else {
          res.redirect("/");
        }
      }
    );
  },
  create: function(req, res) {
    var saveImage = function() {
      var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
      var imgUrl = "";

      for (var i = 0; i < 6; i += 1) {
        imgUrl += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      Models.Image.find({ filename: imgUrl }, function(err, images) {
        if (images.length > 0) {
          saveImage();
        } else {
          var tempPath = req.files.file.path; //error con el path ss
          var ext = path.extname(req.files.file.name).toLowerCase();
          var targetPath = path.resolve("./src/public/upload/" + imgUrl + ext); //creo el path
          console.log(req.files.file);
          if (
            ext === ".png" ||
            ext === ".jpg" ||
            ext === ".jpeg" ||
            ext === ".gif"
          ) {
            fs.rename(tempPath, targetPath, function(err) {
              if (err) throw err;
              console.log(imgUrl);
              //res.redirect("/images/" + imgUrl);
              var newImg = new Models.Image({
                title: req.body.title,
                description: req.body.description,
                filename: imgUrl + ext
              });
              newImg.save(function(err, image) {
                console.log(
                  "Guardo bien en la base de datos la imagen: " + image.filename
                );
                console.log(image.uniqueId);
                res.redirect("/images/" + image.uniqueId);
              });
            });
          } else {
            fs.unlink(tempPath, function(err) {
              if (err) throw err;

              res.json(500, {
                error: "Solo archivos de imagenes son permitidos..."
              });
            });
          }
        }
      });
    };
    saveImage();
  },
  like: function(req, res) {
    //res.json({ likes: 1 });

    console.log("doy un like " + req.params.image_id);
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function(err, image) {
        if (!err && image) {
          image.likes = image.likes + 1;
          image.save(function(err) {
            if (err) {
              res.json(err);
            } else {
              res.json({ likes: image.likes });
            }
          });
        }
      }
    );
  },
  comment: function(req, res) {
    //res.send("The image:comment POST controller" + req.params.image_id);44
    var flag = "es un comentario";
    console.log(flag);
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function(err, image) {
        if (!err && image) {
          var newComment = new Models.Comment(req.body);
          newComment.gravatar = md5(newComment.email);
          newComment.image_id = image._id;
          newComment.save(function(err, comment) {
            if (err) {
              throw err;
            }

            res.redirect("/images/" + image.uniqueId + "#" + comment._id);
          });
        } else {
          res.redirect("/");
        }
      }
    );
  },
  remove: function(req, res) {
    Models.Image.findOne(
      { filename: { $regex: req.params.image_id } },
      function(err, image) {
        if (err) {
          throw err;
        }
        console.log("este es el id " + image._id);
        console.log("esta es el nombre de la imagen " + image.filename);

        //borrado de imagen en archivo y en la base, tambien borrado comentario
        fs.unlink(
          path.resolve("./src/public/upload/" + image.filename),
          function(err) {
            if (err) {
              console.log("error al remover archivo local de imagen");
              throw err;
            }
            Models.Comment.deleteOne({ image_id: image._id }, function(err) {
              if (err) {
                console.log("error al remover comentario");
                throw err;
              }
              Models.Image.deleteOne({ _id: image._id }, function(err) {
                if (!err) {
                  res.json(true);
                } else {
                  console.log("error al remover imagen");
                  res.json(false);
                }
              });
              /*
              //esta deprecado el remove
              image.remove(function(err) {
                if (!err) {
                  res.json(true);
                } else {
                  console.log("error al remover imagen");
                  res.json(false);
                }
              });
              */
            });
          }
        );
      }
    );
  }
};
