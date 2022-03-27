var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    text: String,
    username: String,
    email: String,
    addeddate: { type: Date, default: Date.now }
});

var MovieSchema = new Schema({
    country: String,
    director: String,
    category: [String],
    plot: String,
    poster: String,
    year: Number,
    title: String,
    trailer: String,
    imdbRating: String,
    id: Number,
    comments: [CommentSchema],
});

module.exports = mongoose.model('Movie', MovieSchema);