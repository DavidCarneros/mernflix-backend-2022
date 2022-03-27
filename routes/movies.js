var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

// Models 
var Movie = require('../models/Movie.js');
var Comment = require('../models/Movie.js');
//var Comment = require('../models/Comment.js');

var db = mongoose.connection;

/* GET movies listing. */
router.get('/', function (req, res) {
    Movie.find({}, function (err, movies) {
        if (err) return res.status(500).send(err);
        else res.status(200).json(movies);
    });
});

/* GET single movie by Id */
router.get('/:id', function (req, res, next) {
    // Find movie by id and join comments collections
    Movie.findById(req.params.id).populate('comments').exec(function (err, movie) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        } //return res.status(500).send(err);
        else res.status(200).json(movie);
    });
});

/* Add comment to a movie by id */
router.post('/:id/comments', function (req, res, next) {
    Movie.findById(req.params.id, function (err, movie) {
        if (err) return res.status(500).send(err);
        else {
            // Add comment to movie
            if (!movie.comments) movie.comments = [];
            movie.comments.push({
                text: req.body.text,
                username: req.body.username,
                email: req.body.email,
            });
            // updates the movie with the new comment
            movie.save(function (err, movie) {
                if (err) return res.status(500).send(err);
                else res.status(200).json(movie);
            });
        }
    });
});

module.exports = router;