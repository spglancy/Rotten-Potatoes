const Comment = require('../models/comments.js');

module.exports = function (app) {
  app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
      res.status(200);
    }).catch((err) => {
      console.log(err.message);
    })
  })

  app.delete('/reviews/comments/:id', function (req, res) {
    Comment.findByIdAndRemove(req.params.id).then((comment) => {
      res.status(200);
    }).catch((err) => {
      console.log(err.message);
    })
  })
}
