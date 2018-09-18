const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const Review = require('./models/review');
const Comments = require('./models/comments.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const movies = require('./controllers/movies.js');
const commentController = require('./controllers/commentController.js');
const reviewController = require('./controllers/reviewController.js');

reviewController(app);
commentController(app);
movies(app);

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})