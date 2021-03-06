const dotenv = require("dotenv").config()
const express = require('express');
const app = express();
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const port = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const movies = require('./controllers/movies.js');
const commentController = require('./controllers/commentController.js');
const reviewController = require('./controllers/reviewController.js');

reviewController(app);
commentController(app);
movies(app);

app.listen(port, () => {
  console.log('App listening on port 3000!')
})
