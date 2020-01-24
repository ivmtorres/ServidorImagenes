var models = require("../models");

module.exports = {
  popular: function(callback) {
    models.Image.find({}, {}, { limit: 4, sort: { likes: -1 } }, function(
      err,
      images
    ) {
      if (err) throw err;
      //console.log("estas son las mas populares");
      //console.log(images);
      callback(null, images);
    });
  }
};

/*
module.exports = {
  popular: function() {
    var images = [
      {
        uniqueId: 1,
        title: "Sample Image 1",
        description: "",
        filename: "3v5dod.jpg",
        views: 0,
        likes: 0,
        timestamp: Date.now
      },
      {
        uniqueId: 2,
        title: "Sample Image 2",
        description: "",
        filename: "6s1zlk.jpg",
        views: 0,
        likes: 0,
        timestamp: Date.now
      },
      {
        uniqueId: 3,
        title: "Sample Image 3",
        description: "",
        filename: "bird2.jpg",
        views: 0,
        likes: 0,
        timestamp: Date.now
      },
      {
        uniqueId: 4,
        title: "Sample Image 4",
        description: "",
        filename: "fiw1dz.jpg",
        views: 0,
        likes: 0,
        timestamp: Date.now
      }
    ];
    return images;
  }
};
*/
