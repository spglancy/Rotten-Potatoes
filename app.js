const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/rotten-potatoes');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

const Review = mongoose.model('Review', {
  title: String
});

app.post('/reviews', (req, res) => {
  console.log(req.body);
  // res.render('reviews-new', {});
})

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.get('/', (req, res) => {
  Review.find().then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch((err) => {
      console.log(err);
    })
})
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
