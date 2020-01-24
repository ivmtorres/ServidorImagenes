var models = require("../models"),
  async = require("async");

module.exports = function(callback) {
  async.parallel(
    [
      function(next) {
        //next(null, 20);

        models.Image.count({}, next);
      },
      function(next) {
        //next(null, 10);
        models.Comment.count({}, next);
      },
      function(next) {
        //next(null, 40);

        models.Image.aggregate(
          [
            {
              $group: {
                _id: "1",
                viewsTotal: { $sum: "$views" }
              }
            }
          ],
          function(err, result) {
            var viewsTotal = 0;
            console.log(result);
            if (result !== undefined) {
              if (result.length > 0) {
                viewsTotal += result[0].viewsTotal;
              }
            }
            next(null, viewsTotal);
          }
        );
      },
      function(next) {
        //next(null, 50);

        models.Image.aggregate(
          [
            {
              $group: {
                _id: "1",
                likesTotal: { $sum: "$likes" }
              }
            }
          ],
          function(err, result) {
            var likesTotal = 0;
            console.log(err);
            if (result !== undefined) {
              if (result.length > 0) {
                likesTotal += result[0].likesTotal;
              }
            }
            next(null, likesTotal);
          }
        );
      }
    ],
    function(err, results) {
      callback(null, {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
      });
    }
  );
};

/*
module.exports = function() {
  var stats = {
    images: 20,
    comments: 10,
    views: 10,
    likes: 10
  };

  return stats;
};
*/
