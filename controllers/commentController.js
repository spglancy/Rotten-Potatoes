var Comment = require('../models/comments.js');
const Review = require('../models/review.js');
module.exports = function(app){
    app.post('/reviews/comments', (req, res) => {
       Comment.create(req.body).then(comment => {
           res.redirect(`/reviews/${comment.reviewId}`);
       }).catch((err) => {
           console.log(err.message);
       })
   })
   app.delete('/reviews/comments/:id', function (req, res) {
  console.log("DELETE comment")
  Comment.findByIdAndRemove(req.params.id).then((comment) => {
    res.redirect(`/reviews/${comment.reviewId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})
}
