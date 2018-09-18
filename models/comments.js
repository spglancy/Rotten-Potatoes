const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');
const Schema = mongoose.Schema;

const Comment = mongoose.model('Comment', {
  title: String,
  content: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
});

module.exports = Comment;
