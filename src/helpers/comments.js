var models = require("../models");
var async = require("async");

module.exports = {
  newest: function(callback) {
    models.Comment.find({}, {}, { limit: 5, sort: { timestamp: -1 } }, function(
      err,
      comments
    ) {
      //console.log(comments);
      var attachImage = function(comment, next) {
        models.Image.findOne({ _id: comment.image_id }, function(err, image) {
          if (err) throw err;
          //console.log(image);
          comment.image = image;
          next(err);
        });
      };
      //llamo a mi funcion que atacha los comentarios a la imagen
      async.each(comments, attachImage, function(err) {
        if (err) throw err;
        callback(err, comments);
      });
    });
  }
};

/*
module.exports = {
  newest: function() {
    var comments = [
      {
        image_id: 1,
        email: "test@testing.com",
        name: "Test Tester",
        gravatar:
          "http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45",
        comment: "This is a test comment...",
        timestamp: Date.now(),
        image: {
          uniqueId: 1,
          title: "Sample Image 1",
          description: "",
          filename: "12l242.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now
        }
      },
      {
        image_id: 1,
        email: "test@testing.com",
        name: "Test Tester",
        gravatar:
          "http://www.gravatar.com/avatar/9a99fac7b524fa443560ec7b5ece5ca1?d=monsterid&s=45",
        comment: "Another followup comment!",
        timestamp: Date.now(),
        image: {
          uniqueId: 1,
          title: "Sample Image 1",
          description: "",
          filename: "3epzqf.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now
        }
      }
    ];

    return comments;
  }
};
*/
