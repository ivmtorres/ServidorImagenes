var sidebar = require("../helpers/sidebar");
var ImageModel = require("../models").Image;

module.exports = {
  index: function(req, res) {
    var viewModel = {
      images: []
    };

    ImageModel.find({}, {}, { sort: { timestamp: -1 }, limit: 5 }, function(
      err,
      images
    ) {
      if (err) {
        throw err;
      }

      viewModel.images = images;

      sidebar(viewModel, function(viewModel) {
        res.render("index", viewModel);
      });
    });
  }
};

//datos hardcodeados
/*
module.exports = {
  index: function(req, res) {
    var viewModel = {
      images: [
        {
          uniqueId: 1,
          title: "Sample Image 1",
          description: "",
          filename: "zsqehh.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now
        },
        {
          uniqueId: 2,
          title: "Sample Image 2",
          description: "",
          filename: "zdm31f.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now
        },
        {
          uniqueId: 3,
          title: "Sample Image 3",
          description: "",
          filename: "yhc8rn.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now
        },
        {
          uniqueId: 4,
          title: "Sample Image 4",
          description: "",
          filename: "y6l2lh.jpg",
          views: 0,
          likes: 0,
          timestamp: Date.now
        }
      ]
    };

    sidebar(viewModel, function(viewModel) {
      res.render("index", viewModel);
    });
  }
};
*/
