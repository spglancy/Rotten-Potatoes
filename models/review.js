const mongoose = require('mongoose');
const comment = require('./comments')
mongoose.connect('mongodb://localhost/rotten-potatoes', {useNewUrlParser: true});

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  rating: String
});

module.exports = Review;
