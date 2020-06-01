var Review = require('../models/review.js');
var Comment = require('../models/comments');

module.exports = function (app) {
    app.post('/reviews', (req, res) => {
        Review.create(req.body).then((review) => {
            console.log(review)
            res.redirect(`/reviews/movie/${review.movieTitle}`) // Redirect to reviews/:id
        }).catch((err) => {
            console.log(err.message)
        })
    })

    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    app.delete('/reviews/:id', function (req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    })

    app.get('/reviews', (req, res) => {
        Review.find().then(reviews => {
            res.render('reviews-index', {
                reviews: reviews
            });
        })
            .catch((err) => {
                console.log(err);
            })
    })

    app.get('/reviews/new', (req, res) => {
        res.render('reviews-new', {});
    })

    app.get('/reviews/:id/edit', function (req, res) {
        Review.findById(req.params.id, function (err, review) {
            res.render('reviews-edit', {
                review: review
            });
        })
    })

    app.get('/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).then(review => {
            // fetch its comments
            Comment.find({
                reviewId: req.params.id
            }).then(comments => {
                // respond with the template with both values
                res.render('reviews-show', {
                    review: review,
                    comments: comments
                })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

    app.get('/reviews/movie/:movie', (req, res) => {
        Review.find({ movieTitle: req.params.movie })
            .then(reviews => {
                console.log(reviews)
                res.render('reviews-index', {
                    reviews: reviews,
                    movieTitle: req.params.movie
                })
            })
    })
}
